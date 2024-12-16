const express = require('express');
const morgan = require('morgan');
const fs = require('node:fs');
const path = require('node:path');
const joyasRouter = require('./routes/joyasRouter');
const errorMiddleware = require('./middlewares/errorMiddleware');

// App
const app = express();

//Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(
    morgan('combined', {
        stream: fs.createWriteStream(path.join(__dirname, '../access.log'), {
            flags: 'a',
        }),
    })
);

//Routes
app.use('/joyas', joyasRouter);

//Error handler
app.use('/', errorMiddleware);

module.exports = app;
