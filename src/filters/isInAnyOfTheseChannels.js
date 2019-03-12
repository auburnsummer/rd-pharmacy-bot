// Filter: provide a list of channel IDs. If the post is in any of these channels, it will be allowed through.

module.exports = (channels) => {
    let final = async (message) => {
        return channels.includes(message.channel.id);
    }
    return final;
}