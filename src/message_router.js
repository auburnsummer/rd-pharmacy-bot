let textRoutes = [
    {
        match: /~hello (\w*)/,
        action: require('./actions/hello.js'),
        filters: [require('./filters/isBot.js')(true)]
    },
    {
        match: /~goodbye (\w*)/,
        action: require('./actions/goodbye.js'),
        filters: [require('./filters/isBot.js')(false)]
    }
]

module.exports.routeText = async (message) => {
    for (let route of textRoutes) {
        let result = route.match.exec(message.content)
        if (result) {
            let filters = route.filters.map( (fn) => fn(message) );
            let filter_results = await Promise.all(filters);
            if (filter_results.every((x) => x)) {
                let response = route.action(message, result);
                return response;
            }
        }
    }
    // If there are no matches:
    return Promise.resolve("No matches.");
}