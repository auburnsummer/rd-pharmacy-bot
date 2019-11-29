const express = require('express');
let router = express.Router();

const blends = require('./gcp/blends.js');
const logging = require('./discord/logging.js');

router.get('/stillalive', (req, res) => {
    res.send("Still Alive!");
});

module.exports = router;

