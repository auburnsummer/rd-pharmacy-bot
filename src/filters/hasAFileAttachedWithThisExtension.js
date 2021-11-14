

module.exports = (extension) => {
    let final = async (message) => {
        return message.attachments.find(v => v.name.toLowerCase().endsWith(extension)) !== undefined;
    }
    return final;
}
