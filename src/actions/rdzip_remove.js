const { Client, RichEmbed } = require('discord.js');
const sheets = require('../sheets/sheet_json.js');
const _ = require('lodash');

module.exports = async (message, results) => {
    console.log('remove');
    let levelToRemove = _.trim(results[1]);
    let a = await sheets.removeLevel(levelToRemove);
    if (a) {
        message.react('✅');
    } else {
        return message.reply("an error occured ahhhhhh!! -- check the URL is exactly the same");
    }
}