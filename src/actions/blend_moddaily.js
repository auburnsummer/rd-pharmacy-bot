/*
An action that handles the b@daily command. Moderators can use it whenever
*/

const blends = require('../gcp/blends.js');
const dutils = require('../discord/utils.js');
const userSearch = require('../discord/userSearch.js');

module.exports = async (message, results) => {
    let user = await userSearch.search(message.guild, results[1]);
    if (user) {
        let result = await blends.drink(user.id, message.createdTimestamp, true);
        if (result) {
            return successMessage(message);
        } else {
            return failureMessage(message);
        }
    } else {
        message.channel.send("I couldn't find a user by that name.");
    }

}

let failureMessage = async (message) => {
    let assumedName = dutils.assumedName(message.member);
    return message.channel.send(`☕ | **${assumedName}**, you've already blended today!`);
}

let successMessage = async (message) => {
    return message.react("☕");
}