/*
Handle the "action" of posting in rdzip-showcase
*/

const sugar = require('../rdzips/rdlevel_sugar.js');
const rdsheet = require('../sheets/sheet_json.js');
const Promise = require('bluebird');
const request = require('request-promise');

const client = require('../discord/client_singleton.js');

const config = require('../config.js');

module.exports = async (message, results) => {
    console.log("FILE SUBMISSION");
    // loop through attachments for a .rdzip
    let url;
    let level;
    for (let n of message.attachments.values()) {
        if (n.file.toLowerCase().endsWith('.rdzip')) {
            url = n.url;
        }
    }
    try {
        level = await sugar.makeInternFromURL(url);
    } catch (error) {
        let channel = await client.channels.fetch(config.LOGGING_CHANNEL)
        if (channel) {
            return channel.send("Error parsing rdzip : " + error);
        }
    }
    try {
        await rdsheet.addLevel(level);
    } catch (error) {
        let channel = await client.channels.fetch(config.LOGGING_CHANNEL)
        if (channel) {
            return channel.send("Error uploading to sheet : " + error);
        }
    }
    return Promise.all([

        message.react('✅')
    ]);
}
