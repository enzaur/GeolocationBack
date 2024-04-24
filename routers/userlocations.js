const express = require('express');
const router = express.Router();
const client = require('../database/database');

// CREATE a user location
router.post('/insert_user_locs', async (req, res) => {
    try {
        const { user_id, latitude, longitude } = req.body;
        const query = 'INSERT INTO userLocations (user_id, latitude, longitude) VALUES ($1, $2, $3) RETURNING *';
        const { rows } = await client.query(query, [user_id, latitude, longitude]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error creating user location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// READ all user locations
router.get('/view_user_locations', async (req, res) => {
    try {
        const query = 'SELECT * FROM userLocations';
        const { rows } = await client.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error getting user locations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// UPDATE a user location
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, latitude, longitude } = req.body;
        const query = 'UPDATE userLocations SET user_id = $1, latitude = $2, longitude = $3 WHERE id = $4 RETURNING *';
        const { rows } = await client.query(query, [user_id, latitude, longitude, id]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error updating user location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE a user location
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM userLocations WHERE id = $1';
        await client.query(query, [id]);
        res.json({ message: 'User location deleted successfully' });
    } catch (error) {
        console.error('Error deleting user location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
