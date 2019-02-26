/*
An action that handles the b@timestamp command.
*/

const userSearch = require('../discord/userSearch.js');
const blends = require('../gcp/blends.js');
const dutils = require('../discord/utils');

const { Client, RichEmbed } = require('discord.js');

module.exports = async (message, results) => {
    console.log(results[1]);
    let result

    result = await userSearch.search(message.guild, results[1]);

    if (result) {
        let user = await blends.getUser(result.user.id);
        let userData = user.data();
        console.log(userData);
        if (!results[2]) { // no set, just print out what it is
            embed = new RichEmbed()
                .setColor(result.displayColor)
                .setAuthor(`Timestamp Info: ${dutils.assumedName(result)}`, result.user.displayAvatarURL)
                .setTimestamp(null)
                .addField("Timestamp", `${userData.lastDrinkTimestamp}`, false);
            return message.channel.send(embed);
        } else { // set the value
            console.log(results[2])
            embed = new RichEmbed()
            .setColor(result.displayColor)
            .setAuthor(`Timestamp Set: ${dutils.assumedName(result)}`, result.user.displayAvatarURL)
            .setTimestamp(null)
            .addField("Old", `${userData.lastDrinkTimestamp}`, true)
            .addField("New", results[2], true);
            return Promise.all([
                blends.updateUser(result.user.id, {lastDrinkTimestamp: parseInt(results[2])}),
                message.channel.send(embed)
            ]);
        }
    } else {
        message.channel.send("I couldn't find a user by that name.");
    }
}
