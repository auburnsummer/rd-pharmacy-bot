const { Client, RichEmbed } = require('discord.js');

let DAILY_HELP = new RichEmbed()
    .setAuthor("Daily Blend Manual: b!daily")
    .addField("Summary", "Register your completion of a daily blend.")
    .addField("Details", "This command can also be used in square brackets: `[b!daily]`. In this form, the command can be used anywhere in a post, as opposed to only the start.");

let INFO_HELP = new RichEmbed()
    .setAuthor("Daily Blend Manual: b!info")
    .addField("Summary", "Display the current information for a user.")
    .addField("Details", "Use b!info by itself to display your own info. Otherwise, supply the name of another user to view their info. The artwork changes depending on the current count.");

let HELP_HELP = new RichEmbed()
    .setAuthor("Daily Blend Manual: b!help")
    .addField("Summary", "View help.")
    .addField("Details", "Use b!help by itself to view the quickstart. Supply the name of a command to view additional help.");

let VERSION_HELP = new RichEmbed()
    .setAuthor("Daily Blend Manual: b!version")
    .addField("Summary", "View the current version.")
    .addField("Details", "Also provides a random coffee fact.");

let GENERAL_HELP = new RichEmbed()
    .addField("Quickstart", "Use the `b!daily` command and post your screenshot/video to register your completion of the Daily Blend. The bot will react with :coffee:.You can use `b!info` to view yours or others' currrent count.")
    .addField("Full Command List", `Use \`b!help <command>\` to view details about each command.
\`daily\`, \`info\`, \`help\`, \`version\``)
    .addField("Contact", "The Daily Blend bot is maintained by Ladybug#1863. Please ping me if you have any queries!")

let help_router = {
    "daily": DAILY_HELP,
    "b!daily": DAILY_HELP,
    "info": INFO_HELP,
    "b!info": INFO_HELP,
    "help": HELP_HELP,
    "b!help": HELP_HELP,
    "version": VERSION_HELP,
    "b!version": VERSION_HELP
}


module.exports = (message, results) => {
    if (results[1] in help_router) {
        return message.channel.send(help_router[results[1]]);
    }
    return message.channel.send(GENERAL_HELP)
}