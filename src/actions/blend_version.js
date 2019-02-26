const { Client, RichEmbed } = require('discord.js');

let VERSION = "v0.0.1";

const coffeeFacts = require('../utils/randomCoffeeFact.js');

module.exports = (message, results) => {
    let embed = new RichEmbed()
        .setAuthor("Daily Blend Bot Version")
        .setDescription(VERSION)
        .setFooter(coffeeFacts.getRandomFact())
    return message.channel.send(embed)
}