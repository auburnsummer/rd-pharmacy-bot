/*
An action that handles the rdzip@inspect command. */

const sugar = require('../rdzips/rdlevel_sugar.js');


module.exports = async (message, results) => {
    console.log('inspect');
    let level;
    try {
        level = await sugar.makeInternFromURL(results[1]);
    } catch (error) {
        return message.channel.send(error);
    }
    if (results[2] === 'json') {
        return message.channel.send("```" + JSON.stringify(level, null, 1) + "```");
    }
    return message.channel.send({embeds: [sugar.makeEmbed(level)]});
} 
