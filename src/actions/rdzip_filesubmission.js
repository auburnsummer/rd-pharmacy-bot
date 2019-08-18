/*
Handle the "action" of posting in rdzip-showcase
*/

const sugar = require('../rdzips/rdlevel_sugar.js');
const rdsheet = require('../sheets/sheet_json.js');
const Promise = require('bluebird');
const request = require('request-promise');


module.exports = async (message, results) => {
    console.log("FILE SUBMISSION");
    // loop through attachments for a .rdzip
    let url;
    let level;
    for (let n of message.attachments.array()) {
        if (n.filename.toLowerCase().endsWith('.rdzip')) {
            url = n.url;
        }
    }
    try {
        level = await sugar.makeInternFromURL(url);
    } catch (error) {
        return message.channel.send(error);
    }
    try {
        await rdsheet.addLevel(level);
    } catch (error) {
        return message.channel.send("Error uploading to sheet : " + error);
    }
    return Promise.all([
        request.get(process.env.SPREADSHEET_PING_URL),
        message.react('✅')
    ]);
}