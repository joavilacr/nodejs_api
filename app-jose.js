// ***** Required External Modules ***** //

// Import express
const express = require('express');

// ***** App Variables ***** //

// Use express
const app = express();

// Define a host, being passed from the env.PORT, alternatively will pickup host '0.0.0.0'
const host = '0.0.0.0';

// Define a port, being passed from the env.PORT, alternatively will pickup port 8080
const port = 8080;

// Importing routes to do the encrypt/decrypt/heath
const encryptRouter = require('./routes/encrypt');
const decryptRouter = require('./routes/decrypt');
const healthRouter = require('./routes/health');

// ***** App Configuration ***** //
app.use('/api', encryptRouter);
app.use('/api', decryptRouter);
app.use('/api', healthRouter);

// Every time a get request to '/', its gonna respond with a function.
app.get('/', (req, res) => {
    res.send('Welcome to JOSE AVILA REST API solution for WIND RIVER code challenge 2021 :) ');
});

// To Kick out the application
app.listen(port, host);
console.log(`Running on http://${host}:${port}`);