

module.exports = (extension) => {
    let final = async (message) => {
        for (let n of message.attachments.array()) {
            if (n.filename.toLowerCase().endsWith(extension)) {
                return true;
            }
        }
        return false;
    }
    return final;
}