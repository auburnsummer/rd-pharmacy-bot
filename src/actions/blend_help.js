const { Client, RichEmbed } = require('discord.js');

let GENERAL_HELP = new RichEmbed()
    .addField("Quickstart", "Use the `b!daily` command and post your screenshot/video to register your completion of the Daily Blend. The bot will react with :coffee:.You can use `b!info` to view yours or others' currrent count.")
    .addField("Full Command List", `Use \`b!help <command>\` to view details about each command.
\`daily\`, \`info\`, \`help\`, \`version\``)
    .addField("Contact", "The Daily Blend bot is maintained by Ladybug#1863. Please ping me if you have any queries!")

module.exports = (message, results) => {
    return message.channel.send(GENERAL_HELP)
}