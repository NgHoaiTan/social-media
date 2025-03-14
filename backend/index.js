const express = require('express');
const dotenv = require('dotenv').config();

const app = express();



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server listening on ${PORT}`));