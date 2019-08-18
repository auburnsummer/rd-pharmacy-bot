/*
Handle the rdzip!optout command

which toggles if users are opted out of the spreadsheet
*/

const blends = require('../gcp/blends.js');
const d_utils = require('../discord/utils.js');

const OPT_OUT_MESSAGE = "you are now opted-out from the spreadsheet.";
const OPT_IN_MESSAGE = "you are now opted-in to the spreadsheet."

module.exports = async (message, results) => {
    let consent = await blends.getProperty(message.author.id, 'rdzip_consent');
    let toggle = !consent;
    await blends.updateUser(message.author.id, {rdzip_consent: toggle});
    if (toggle) {
        // opted in.
        return message.channel.send(`<:groovy:437835303441661972> | **${d_utils.assumedName(message.member)}**, ${OPT_IN_MESSAGE}`);
    } else {
        return message.channel.send(`<:tired:436375084702236683> | **${d_utils.assumedName(message.member)}**, ${OPT_OUT_MESSAGE}`);
    }
}