/*
Handle the rdzip!optout command

which toggles if users are opted out of the spreadsheet
*/

const d_utils = require('../discord/utils.js');

const OPT_OUT_MESSAGE = "you are now opted-out from the spreadsheet.";
const OPT_IN_MESSAGE = "rdzip!optout command has been removed"

module.exports = async (message, results) => {
        return message.channel.send(`<:groovy:437835303441661972> | **${d_utils.assumedName(message.member)}**, ${OPT_IN_MESSAGE}`);

}