/*
Called when a user accidentally uploads a rdlevel to showcase
*/

const config = require('./config.js');

module.exports = async (message, results) => {
        // Perhaps inprove on this message with an image + better instructions? mostly just a placeholder for now ig.
        return message.author.send(`It looks like you've sent a rdlevel file in <#${config.SHOWCASE_CHANNEL}>; .rdlevel files do not contain external files such as the song file or any other assets you may have used, so the level may not work properly. Please publish your level as an .rdzip file so people can play it as you intended.`);
}