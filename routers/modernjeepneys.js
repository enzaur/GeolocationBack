const express = require('express');
const router = express.Router();
const client = require('../database/database');

// CREATE a modern jeepney
router.post('/register_modernjeep', async (req, res) => {
    try {
        const { plate_number, model, capacity, route_id } = req.body;
        const query = 'INSERT INTO modernJeepneys (plate_number, model, capacity, route_id) VALUES ($1, $2, $3, $4) RETURNING *';
        const { rows } = await client.query(query, [plate_number, model, capacity, route_id]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error creating modern jeepney:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// READ all modern jeepneys
router.get('/view_modernjeeps', async (req, res) => {
    try {
        const query = 'SELECT * FROM modernJeepneys';
        const { rows } = await client.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error getting modern jeepneys:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// UPDATE a modern jeepney
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { plate_number, model, capacity, route_id } = req.body;
        const query = 'UPDATE modernJeepneys SET plate_number = $1, model = $2, capacity = $3, route_id = $4 WHERE id = $5 RETURNING *';
        const { rows } = await client.query(query, [plate_number, model, capacity, route_id, id]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error updating modern jeepney:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE a modern jeepney
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM modernJeepneys WHERE id = $1';
        await client.query(query, [id]);
        res.json({ message: 'Modern jeepney deleted successfully' });
    } catch (error) {
        console.error('Error deleting modern jeepney:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
