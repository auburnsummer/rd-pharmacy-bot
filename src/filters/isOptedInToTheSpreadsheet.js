
const blends = require('../gcp/blends.js');


module.exports = async (filterDirection) => {
    let final = async (message) => {
        let value = await blends.getProperty(message.author.id, 'rdzip_consent');
        return value === filterDirection;
    }

    return final;
}