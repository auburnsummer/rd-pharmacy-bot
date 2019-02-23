/*
An action that handles the b!daily command.
*/

const blends = require('../gcp/blends.js');
const dutils = require('../discord/utils.js');

module.exports = async (message, results) => {
    let result = await blends.drink(message.author.id, message.createdTimestamp);
    if (result) {
        return successMessage(message);
    } else {
        return failureMessage(message);
    }
}

let failureMessage = async (message) => {
    let assumedName = dutils.assumedName(message.member);
    return message.channel.send(`☕ | **${assumedName}**, you've already blended today!`);
}

let successMessage = async (message) => {
    return message.react("☕");
}