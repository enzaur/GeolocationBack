const express = require('express');
const router = express.Router();
const client = require('../database/database');

// CREATE a location
router.post('/register_loc', async (req, res) => {
    try {
        const { name, latitude, longitude, route_id } = req.body;
        const query = 'INSERT INTO locations (name, latitude, longitude, route_id) VALUES ($1, $2, $3, $4) RETURNING *';
        const { rows } = await client.query(query, [name, latitude, longitude, route_id]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error creating location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// READ all locations
router.get('/view_locations', async (req, res) => {
    try {
        const query = 'SELECT * FROM locations';
        const { rows } = await client.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error getting locations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// UPDATE a location
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, latitude, longitude, route_id } = req.body;
        const query = 'UPDATE locations SET name = $1, latitude = $2, longitude = $3, route_id = $4 WHERE id = $5 RETURNING *';
        const { rows } = await client.query(query, [name, latitude, longitude, route_id, id]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error updating location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE a location
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM locations WHERE id = $1';
        await client.query(query, [id]);
        res.json({ message: 'Location deleted successfully' });
    } catch (error) {
        console.error('Error deleting location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
