const { Client, MessageEmbed } = require('discord.js');

let VERSION = "v0.0.1";

module.exports = (message, results) => {
    let embed = new MessageEmbed()
        .setAuthor("RDZip Bot Version")
        .setDescription(VERSION)
    return message.channel.send({embeds: [embed]})
}
