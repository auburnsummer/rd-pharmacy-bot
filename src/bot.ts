const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
    console.log("Ready.");
})

client.on('message', (message:any) => {
    if (message.content == "hi") {
        message.channel.send("Hello!");
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);