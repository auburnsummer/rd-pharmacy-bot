/*
An action that handles the rdzip^approve command. */

const sugar = require('../rdzips/rdlevel_sugar.js');
const rdsheet = require('../sheets/sheet_json.js');
const Promise = require('bluebird');
const request = require('request-promise');

module.exports = async (message, results) => {
    console.log('verify');
    let level;
    try {
        level = await sugar.makeInternFromURL(results[1]);
    } catch (error) {
        return message.channel.send(error);
    }
    level.verified = false;
    console.log('removing old level');
    console.log(level.download_url);
    rdsheet.removeLevel(level.download_url);
    console.log('adding level');
    rdsheet.addLevel(level)
    return Promise.all([
        message.react('✅')
    ]);
    
	

} 