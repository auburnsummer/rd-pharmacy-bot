const { Client, RichEmbed } = require('discord.js');

let VERSION = "v0.0.1";

module.exports = (message, results) => {
    let embed = new RichEmbed()
        .setAuthor("RDZip Bot Version")
        .setDescription(VERSION)
    return message.channel.send(embed)
}