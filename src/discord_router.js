/*
The definitions of the discord-chat based interface.
Basically, we go through each of the rules in order:
match: the regex the message needs to match.
action: what we actually do.
filters: the requirements needed for this message to go through.
*/

const config = require('./config.js');

const MODERATOR_ROLES = config.MODERATOR_ROLES;

let textRoutes = [
    { // b!daily
        match: /(?:^b!daily)|(\[b!daily\])/,
        action: require('./actions/blend_daily.js'),
        filters: [
            require('./filters/isBot.js')(false)
        ]
    },
    { // b!info
        match: /^b!info ?(.*)/,
        action: require('./actions/blend_info.js'),
        filters: [
            require('./filters/isBot.js')(false)
        ]
    },
    { // b@timeset
        match: /^b@timeset ?(\d*)/,
        action: require('./actions/blend_timeset.js'),
        filters: [
            require('./filters/hasAnyOfTheseRoles.js')(MODERATOR_ROLES)
        ]
    },
    { // b@daily
        match: /^b@daily ?(.*)/,
        action: require('./actions/blend_moddaily.js'),
        filters: [
            require('./filters/hasAnyOfTheseRoles.js')(MODERATOR_ROLES)
        ]
    },
    { // b@set
        match: /^b@set +(.+) +(\d+)/,
        action: require('./actions/blend_modset.js'),
        filters: [
            require('./filters/hasAnyOfTheseRoles.js')(MODERATOR_ROLES)
        ]
    }
]

module.exports.routeText = async (message) => {
    for (let route of textRoutes) {
        // Check if the regex matches.
        let result = route.match.exec(message.content)
        if (result) {
            // execute all the filters asynchronously.
            let filters = route.filters.map( (fn) => fn(message) );
            let filter_results = await Promise.all(filters);
            // They all need to return true for us to go through.
            if (filter_results.every((x) => x)) {
                let response = route.action(message, result);
                return response;
            }
        }
    }
    // If there are no matches:
    return Promise.resolve("No matches.");
}