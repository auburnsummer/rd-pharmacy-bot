/*
An action that handles the b!info command.
*/

const userSearch = require('../discord/userSearch.js');
const blends = require('../gcp/blends.js');
const dutils = require('../discord/utils');
const roles = require('../discord/give_roles.js');

const { Client, RichEmbed } = require('discord.js');

const ZERO_COFFEE_IMAGE = "https://cdn.discordapp.com/attachments/409492674576384000/554105296910548992/barista_bot_images_1.png";
const TEN_TO_NINETEEN_COFFEE_IMAGE = "https://cdn.discordapp.com/attachments/409492674576384000/554814030473199633/barista_bot_images_3.png";

const getImage = (score) => {
    if (score > 0) {
        return TEN_TO_NINETEEN_COFFEE_IMAGE;
    } else {
        return ZERO_COFFEE_IMAGE;
    }
}

let genField = (score, threshold) => {
    let s = `${score}/${threshold}`
    if (score >= threshold) {
        s += ":coffee:"
    }
    return s
}

module.exports = async (message, results) => {
    console.log(results[1]);
    let result;

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
            .setTimestamp(null)
            .addField("Count", `${userData.count}`, false)
            .addField("Visitor Progress", genField(userData.count, 10), true)
            .addField("Regular Progress", genField(userData.count, 30), true)
            .setImage(getImage(userData.count));
        return Promise.all([
            message.channel.send(embed),
            roles.checkAndGiveRoles(result)
        ]);
    } else {
        message.channel.send("I couldn't find a user by that name.");
    }
}
