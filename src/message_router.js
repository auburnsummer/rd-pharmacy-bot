let textRoutes = [
    {
        match: /~hello (\w*)/,
        action: require('./actions/hello.js')
    }
]

module.exports.routeText = (message) => {
    for (let route of textRoutes) {
        let result = route.match.exec(message.content)
        if (result) {
            let response = route.action(message, result);
            return response;
        }
    }
    // If there are no matches:
    return Promise.resolve("No matches.");
}