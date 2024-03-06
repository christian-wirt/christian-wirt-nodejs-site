const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override')
const db = require('./db');
const userRouter = require('./routes/user-router');
const { config } = require('dotenv');

config();

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cors());
app.use(bodyParser.json());

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/', userRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));