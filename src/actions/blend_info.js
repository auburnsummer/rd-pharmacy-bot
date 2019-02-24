/*
An action that handles the b!info command.
*/

const userSearch = require('../discord/userSearch.js');
const blends = require('../gcp/blends.js');
const dutils = require('../discord/utils');
const roles = require('../discord/give_roles.js');

const { Client, RichEmbed } = require('discord.js');

let genField = (score, threshold) => {
    let s = `${score}/${threshold}`
    if (score >= threshold) {
        s += ":coffee:"
    }
    return s
}

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
        let userData = user.data();
        console.log(userData);
        embed = new RichEmbed()
            .setColor(result.displayColor)
            .setAuthor(`Daily Blend Info: ${dutils.assumedName(result)}`, result.user.displayAvatarURL)
            .setFooter(`Timestamp of last drink: ${userData.lastDrinkTimestamp}`)
            .setTimestamp()
            .addField("Count", `${userData.count}`, false)
            .addField("Visitor Progress", genField(userData.count, 10), true)
            .addField("Regular Progress", genField(userData.count, 30), true);
        return Promise.all([
            message.channel.send(embed),
            roles.checkAndGiveRoles(result)
        ]);
    } else {
        message.channel.send("I couldn't find a user by that name.");
    }
}
