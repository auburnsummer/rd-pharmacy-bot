const express = require('express');
let router = express.Router();

const blends = require('./gcp/blends.js');
const logging = require('./discord/logging.js');

router.get('/stillalive', (req, res) => {
    res.send("Still Alive!");
});

router.post('/timeset', (req, res) => {
    let time = parseInt(req.query.time);
    if (isFinite(time)) {
        return Promise.all([
            blends.setBlendTime(time),
            logging.log_timestamp_change(time)
        ])
        .then( (data) => {
            res.send("Success!");
        })
        .catch( (err) => {
            console.log(err);
        })
    } else {
        res.send("Invalid data.");
    }
});

module.exports = router;

