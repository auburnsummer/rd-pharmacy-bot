const express = require('express');
const app = express();

app.get('/', (req:any, res:any) => {
    res.send("Hello World!");
});

app.listen(8000, () => {
    console.log("Listening to port 8000.");
});