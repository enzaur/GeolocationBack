const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const client = require('./database/database');
const app = express();
const PORT = process.env.PORT || 3000; // Changed port to 3000 for demonstration

app.use(cors());
app.use(bodyParser.json());

// Import route files
const routesRouter = require('./routers/routes');
const locationsRouter = require('./routers/locations');
const modernJeepneysRouter = require('./routers/modernjeepneys');
const usersRouter = require('./routers/users');
const userLocationsRouter = require('./routers/userlocations');

// Define routes
app.use('/routes', routesRouter);
app.use('/locations', locationsRouter);
app.use('/modernjeepneys', modernJeepneysRouter);
app.use('/users', usersRouter);
app.use('/userlocations', userLocationsRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Restful API Backend Using ExpresJS' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
