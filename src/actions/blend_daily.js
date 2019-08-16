/*
An action that handles the b!daily command.
*/

const blends = require('../gcp/blends.js');
const dutils = require('../discord/utils.js');
const roles = require('../discord/give_roles.js');

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

// success message is: react to their post with coffee
let successMessage = async (message) => {
    return Promise.all([
        message.react("☕"),
        roles.checkAndGiveRoles(message.member)
    ]);
}