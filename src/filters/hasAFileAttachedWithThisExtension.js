

module.exports = (extension) => {
    let final = async (message) => {
        for (let n of message.attachments.values()) {
            if (n.name.toLowerCase().endsWith(extension)) {
                return true;
            }
        }
        return false;
    }
    return final;
}
