module.exports = (message:any, results:any) => {
    console.log(message);
    console.log(results);
    message.channel.send(`Hi ${results[1]}`);
}