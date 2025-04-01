const express = require('express');
const connectDB = require('./src/config/databaseConfig');
const dotenv = require('dotenv').config();
const apiV1Route = require('./src/routes/indexRoute');
const passport = require('./src/config/passport')
const cookieParser = require('cookie-parser')

const { app, server } = require('./src/config/socket')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(passport.initialize());
connectDB();

apiV1Route(app);


const PORT = process.env.PORT || 8000;


server.listen(PORT, () => console.log(`server listening on ${PORT}`));