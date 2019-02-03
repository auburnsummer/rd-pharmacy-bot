module.exports = (message, results) => {
    console.log(message);
    console.log(results);
    return message.channel.send(`Hi ${results[1]}`);
}