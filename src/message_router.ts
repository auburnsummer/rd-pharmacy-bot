let textRoutes = [
    {
        match: /~hello (\w*)/,
        action: require('./actions/hello.js')
    }
]

module.exports.routeText = (message:any) => {
    for (let route of textRoutes) {
        let result = route.match.exec(message.content)
        if (result) {
            return route.action(message, result);
        }
    }
}