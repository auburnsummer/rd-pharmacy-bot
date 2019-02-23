let E = module.exports = {};

const LOGGING_CHANNEL = '543036200982937610'
const client = require('./client_singleton.js');

E.log_timestamp_change = (newTimestamp) => {
    let channel = client.channels.get(LOGGING_CHANNEL);
    return channel.send(`Updated timestamp to ${newTimestamp}`);
}