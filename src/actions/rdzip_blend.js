/*
An action that handles the rdzip@blend command. */

const sugar = require('../rdzips/rdlevel_sugar.js');

const Discord = require('discord.js');
const config = require('../config.js');

const hook = new Discord.WebhookClient({
    id: config.BLEND_WEBHOOK_ID,
    token: config.BLEND_WEBHOOK_TOKEN
});


module.exports = async (message, results) => {
    console.log('blend');
    let level;
    try {
        level = await sugar.makeInternFromURL(results[1]);
    } catch (error) {
        return message.channel.send(error);
    }
    return hook.send({embeds: sugar.makeBlendEmbeds(level)});
} 
