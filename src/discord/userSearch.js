// handle fuzzy matching of users (e.g. type "noche" to get <>noche<>)

let E = module.exports = {};
const Fuse = require('fuse.js');

const mentionRegex = /<@!?(\d+)>/;

E.search = async (guild, searchTerm) => {
    let guild2 = await guild.fetchMembers();

    // First, let's see if it's an ID. If it's an ID, it needs to match exactly.
    let members = guild2.members;
    if (members.has(searchTerm)) {
        return members.get(searchTerm);
    }
    // Now, let's check if there's a mention.
    let regexResult = mentionRegex.exec(searchTerm);
    if (regexResult && members.has(regexResult[1])) {
        return members.get(regexResult[1]);
    } 

    // Otherwise, proceed to fuzzy matching.
    let memberArray = guild2.members.array();
    let options = {
        threshold: 0.3,
        location: 0,
        distance: 80,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "nickname",
            "user.username",
        ]
    }
    let fuse = new Fuse(memberArray, options);
    let result = fuse.search(searchTerm);
    if (result.length > 0) {
        return result[0];
    }

    // if all of that failed, we found no one!
    return false;
}