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
    let level;
    let rdzip_attachment = message.attachments.find(v => v.name.toLowerCase().endsWith('.rdzip'));
    let url;
    if (rdzip_attachment) {
        url = rdzip_attachment.url;
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
