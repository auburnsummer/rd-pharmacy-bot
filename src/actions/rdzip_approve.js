/*
An action that handles the rdzip@inspect command. */

const sugar = require('../rdzips/rdlevel_sugar.js');
const sheet = require('../sheets/sheet_json.js');


module.exports = async (message, results) => {
    console.log('approve');
    await sheet.updateLevel(results[1])
    let level;
    try {
        level = await sugar.makeInternFromURL(results[1]);
    } catch (error) {
        return message.channel.send(error);
    }
    level = sheet.fillWithSchema(level)

} 