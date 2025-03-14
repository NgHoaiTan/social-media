const express = require('express');
const connectDB = require('./src/config/databaseConfig');
const dotenv = require('dotenv').config();

const app = express();



const PORT = process.env.PORT || 8000;

connectDB();
app.listen(PORT, () => console.log(`server listening on ${PORT}`));