
const blends = require('../gcp/blends.js');


module.exports = async (message) => {
    let value = await blends.getProperty(message.author.id, 'rdzip_consent');
    return value;
}