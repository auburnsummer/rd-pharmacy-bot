// Filter: provide True as argument to filter for webhook message, False for opposite

module.exports = (filterDirection) => {
    let final = async (message) => {
        return ("webhookID" in message) === filterDirection;
    }
    return final;
}