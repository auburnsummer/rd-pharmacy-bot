let E = module.exports = {};

const client = require('./client_singleton.js');
const config = require('../config.js');

const ICON_URL = "https://cdn.discordapp.com/attachments/405963795819790346/502683150795669514/coffee-drawing-1.png"

const { Client, RichEmbed } = require('discord.js');

const LOGGING_CHANNEL = config.LOGGING_CHANNEL;

E.log_timestamp_change = (newTimestamp) => {
    let channel = client.channels.get(LOGGING_CHANNEL);
    const embed = new RichEmbed()
        .setDescription(`Blend timestamp updated to ${newTimestamp}`)
        .setAuthor("Blend Timestamp Updated", ICON_URL)
        .setColor(0x54d8ac)
        .setTimestamp()
    return channel.send(embed);
}