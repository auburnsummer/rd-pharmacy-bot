/*
An action that handles the b@set command. Moderators can use it to set peoples count to whatever
*/

const blends = require('../gcp/blends.js');
const dutils = require('../discord/utils.js');
const userSearch = require('../discord/userSearch.js');

const { Client, RichEmbed } = require('discord.js');

module.exports = async (message, results) => {
    let user = await userSearch.search(message.guild, results[1]);
    if (user) {
        let n = parseInt(results[2]);
        let previous = await blends.getUser(user.id);
        let previousData = previous.data();
        let result = await blends.updateUser(user.id, {count: n});
        if (result) {
            let embed = new RichEmbed()
                .setAuthor("Moderation Override")
                .setTimestamp()
                .addField("User", user.user.tag, true)
                .addField("Previous", previousData.count.toString(), true)
                .addField("New", n.toString(), true)
            return message.channel.send(embed)
        }
    } else {
        message.channel.send("I couldn't find a user by that name.");
    }

}