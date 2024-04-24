const express = require('express');
const router = express.Router();
const client = require('../database/database');

// CREATE a route
router.post('/create_routes', async (req, res) => {
    try {
        const { name, description, is_formal } = req.body;
        const query = 'INSERT INTO routes (name, description, is_formal) VALUES ($1, $2, $3) RETURNING *';
        const { rows } = await client.query(query, [name, description, is_formal]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error creating route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// READ all routes
router.get('/view_routes', async (req, res) => {
    try {
        const query = 'SELECT * FROM routes';
        const { rows } = await client.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error getting routes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// UPDATE a route
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, is_formal } = req.body;
        const query = 'UPDATE routes SET name = $1, description = $2, is_formal = $3 WHERE id = $4 RETURNING *';
        const { rows } = await client.query(query, [name, description, is_formal, id]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error updating route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE a route
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM routes WHERE id = $1';
        await client.query(query, [id]);
        res.json({ message: 'Route deleted successfully' });
    } catch (error) {
        console.error('Error deleting route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
