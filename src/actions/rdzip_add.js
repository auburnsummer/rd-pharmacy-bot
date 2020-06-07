const sugar = require('../rdzips/rdlevel_sugar.js');
const rdsheet = require('../sheets/sheet_json.js');
const Promise = require('bluebird');
const request = require('request-promise');
module.exports = async (message, results) => {

    console.log('add');
    console.log(message.author.username);
    let level;
    try {
        level = await sugar.makeInternFromURL(results[1]);
    } catch (error) {
        return message.channel.send(error);
    }
    console.log(level);
    try {
	if (require('../verified.js').includes(message.author.username)) {
	level.verified=true
	
	}
        await rdsheet.addLevel(level);

    } catch (error) {
        return message.channel.send("Error uploading to sheet : " + error);
    }
    return Promise.all([
        request.post(process.env.SPREADSHEET_PING_URL),
        message.react('✅')
    ]);
}