/*
An action that handles the b!info command.
*/

const userSearch = require('../discord/userSearch.js');
const blends = require('../gcp/blends.js');

module.exports = async (message, results) => {
    console.log(results[1]);
    let result

    if (results[1]) {
        result = await userSearch.search(message.guild, results[1]);
    } else { // they can leave it blank to just get their own info. 
        result = message.member;
    }
    if (result) {
        let user = await blends.getUser(result.user.id);
        message.channel.send(`Score: ${user.count}, timestamp: ${user.lastDrinkTimestamp}`);
    } else {
        message.channel.send("I couldn't find a user by that name.");
    }
}
