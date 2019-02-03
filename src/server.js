const express = require('express');
const app = express();
var Promise = require('bluebird');

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(8000, () => {
    console.log("Listening to port 8000.");
});

require('./bot.js');