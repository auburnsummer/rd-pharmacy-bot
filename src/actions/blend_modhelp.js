const { Client, RichEmbed } = require('discord.js');

let DAILY_HELP = new RichEmbed()
    .setAuthor("Daily Blend Manual: b@daily")
    .addField("Summary", "Register a daily blend completion for someone else.")
    .addField("Details", "Can't be used in square brackets. Supply the name of another user to increment their daily blend count. Note that this still allows the user in question to use b!daily themselves.");

let BLENDTIME_HELP = new RichEmbed()
    .setAuthor("Daily Blend Manual: b@blendtime")
    .addField("Summary", "Set the blend post timestamp.")
    .addField("Details 1", "The **blend post timestamp** is the time where the lastest blend was posted. This is compared to the last time a user posted b!daily to determine if they should be able to blend today.")
    .addField("Details 2", "If a user's **previous blend timestamp** is less than than the blend post timestamp, the user is allowed to blend today.")
    .addField("Details 3", "Using this command by itself will set the blendtime to the current time. Otherwise, supply a parameter.")
    .addField("Details 4", "Typically, this command will be automatically triggered from the spreadsheet. You typically won't need to use it yourself.")

let TIMESTAMP_HELP = new RichEmbed()
    .setAuthor("Daily Blend Manual: b@timestamp")
    .addField("Summary", "View the blend post timestamp for a user, or set it.")
    .addField("Details 1", "See the help for blendtime for more information about the blend post timestamp.")
    .addField("Details 2", "Supply a user to view their timestamp. Supply a user and a number to set their timestamp.")
    .addField("Details 3", "One could use this command to ban a user from the daily blend, by setting their post timestamp to a point very far in the future.");

let SET_HELP = new RichEmbed()
    .setAuthor("Daily Blend Manual: b@timestamp")
    .addField("Summary", "Set the score for a user.")
    .addField("Details", "Supply the user, and then their new score. The bot will reply with the change.")


let GENERAL_HELP = new RichEmbed()
    .addField("Full Command List", `Use \`b@help <command>\` to view details about each command.
\`daily\`, \`blendtime\`, \`set\`, \`timestamp\``)
    .addField("Contact", "The Daily Blend bot is maintained by Ladybug#1863. Please ping me if you have any queries!")

let help_router = {
    "daily": DAILY_HELP,
    "blendtime": BLENDTIME_HELP,
    "timestamp": TIMESTAMP_HELP,
    "set": SET_HELP
}


module.exports = (message, results) => {
    if (results[1] in help_router) {
        return message.channel.send(help_router[results[1]]);
    }
    return message.channel.send(GENERAL_HELP)
}