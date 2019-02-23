const blends = require('../gcp/blends.js');

module.exports = async (message, results) => {
    let n;
    if (results[1]) {
        n = parseInt(results[1]);
    } else {
        n = message.createdTimestamp;
    }
    let result = await blends.setBlendTime(n);
    if (result) {
        return message.channel.send(`Blend timestamp set to ${n}`);
    }
}
