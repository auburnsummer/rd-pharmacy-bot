// Filter: provide True as argument to filter for bot message, False for opposite

module.exports = (filterDirection) => {
    let final = async (message) => {
        return message.author.bot === filterDirection;
    }
    return final;
}