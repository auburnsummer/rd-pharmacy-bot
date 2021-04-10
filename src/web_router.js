const express = require('express');
let router = express.Router();

router.get('/stillalive', (req, res) => {
    res.send("Still Alive!");
});

module.exports = router;

