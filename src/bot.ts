const Discord = require('discord.js');

const client = new Discord.Client();
const router = require('./message_router.js');

client.on('ready', () => {
    console.log("Ready.");
})

client.on('message', (message:any) => {
    router.routeText(message);
});

client.login(process.env.DISCORD_BOT_TOKEN);