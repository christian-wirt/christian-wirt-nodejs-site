const mongoose = require('mongoose');
const { config } = require('dotenv');

config();
const uri = process.env.MONG_URI;

mongoose
    .connect(uri, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message);
    })

const db = mongoose.connection;

module.exports = db;