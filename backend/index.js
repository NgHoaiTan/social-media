const express = require('express');
const connectDB = require('./src/config/databaseConfig');
const dotenv = require('dotenv').config();
const apiV1Route = require('./src/routes/indexRoute');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
connectDB();

apiV1Route(app);


const PORT = process.env.PORT || 8000;


app.listen(PORT, () => console.log(`server listening on ${PORT}`));