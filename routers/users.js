const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const client = require('../database/database');

// CREATE a user
router.post('/register', async (req, res) => {
    try {
        const { username, password, email, first_name, last_name, phone_number, role, assigned_jeepney_id } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        const query = 'INSERT INTO users (username, password, email, first_name, last_name, phone_number, role, assigned_jeepney_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
        const { rows } = await client.query(query, [username, hashedPassword, email, first_name, last_name, phone_number, role, assigned_jeepney_id]);
        res.json(rows[0]);
        //res.send("User created successfully!");
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// READ all users
router.get('/view_users', async (req, res) => {
    try {
        const query = 'SELECT * FROM users';
        const { rows } = await client.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// UPDATE a user
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, email, first_name, last_name, phone_number, role, assigned_jeepney_id } = req.body;

        // Hash the password if provided
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
        }

        // Ensure assigned_jeepney_id is null if not provided
        const assignedJeepneyId = assigned_jeepney_id ? parseInt(assigned_jeepney_id) : null;

        const query = 'UPDATE users SET username = $1, email = $2, first_name = $3, last_name = $4, phone_number = $5, role = $6, assigned_jeepney_id = $7';

        // If password is provided, include it in the update query
        if (hashedPassword) {
            query += ', password = $8';
        }

        query += ' WHERE id = $' + (hashedPassword ? '9' : '8') + ' RETURNING *';

        const parameters = [username, email, first_name, last_name, phone_number, role, assignedJeepneyId];

        // If password is provided, add it to the parameters
        if (hashedPassword) {
            parameters.push(hashedPassword);
        }

        parameters.push(id);

        const { rows } = await client.query(query, parameters);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM users WHERE id = $1';
        await client.query(query, [id]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
