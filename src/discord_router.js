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

    {
        // rdzip!version
        match: /^rdzip!version/,
        action: require('./actions/rdzip_version.js'),
        filters: [
            require('./filters/isBot.js')(false),
        ]
    },
    {
        // rdzip!optout / rdzip!optin
        match: /^rdzip!opt((out)|(in))/ ,
        action: require('./actions/rdzip_optout.js'),
        filters: [
            require('./filters/isBot')(false)
        ]
    },
    { // rdzip^inspect <url> [json]
        match: /^rdzip\^inspect +(.+?) ?(json)?$/,
        action: require('./actions/rdzip_inspect.js'),
        filters: [
            require('./filters/isInAnyOfTheseChannels.js')(config.PHARMACY_CHANNELS)
        ]
    },
    { // rdzip^approve <url> [json]
        match: /^rdzip\^approve +(.+?) ?(json)?$/,
        action: require('./actions/rdzip_approve.js'),
        filters: [
            require('./filters/isInAnyOfTheseChannels.js')(config.PHARMACY_CHANNELS)
        ]
    },
    { // rdzip^unapprove <url> [json]
        match: /^rdzip\^unapprove +(.+?) ?(json)?$/,
        action: require('./actions/rdzip_unapprove.js'),
        filters: [
            require('./filters/isInAnyOfTheseChannels.js')(config.PHARMACY_CHANNELS)
        ]
    },
    { // rdzip^blend <url>
        match: /^rdzip\^blend (.+)/,
        action: require('./actions/rdzip_blend.js'),
        filters: [
            require('./filters/isBot.js')(false),
            require('./filters/hasAnyOfTheseRoles.js')(MODERATOR_ROLES)
        ]
    },
    { // rdzip^add <url>
        match: /^rdzip\^add (.+)/,
        action: require('./actions/rdzip_add.js'),
        filters: [
            require('./filters/isBot.js')(false),
            require('./filters/hasAnyOfTheseRoles.js')(MODERATOR_ROLES)
        ]
    },
]

module.exports.routeText = async (message) => {
    for (let route of textRoutes) {
        // Check if the regex matches.
        let result = route.match.exec(message.content)
        if (result) {
            // execute all the filters asynchronously.
            let filters = route.filters.map( (fn) => fn(message) );
            // todo: immediately continue if any of the promises fail?
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
