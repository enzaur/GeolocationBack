const { Client } = require('pg');

// Connection details
const connectionString = "postgresql://geolocationdb_owner:gp5QNh8XGOMn@ep-weathered-recipe-a1jnht7r.ap-southeast-1.aws.neon.tech/geolocationdb?sslmode=require";

// Create a new PostgreSQL client
const client = new Client({
    connectionString: connectionString,
});

// Connect to the database
client.connect()
    .then(() => {
        console.log('Connected to the database');
        // You can start executing queries here
    })
    .catch(err => console.error('Error connecting to database', err));

module.exports = client;