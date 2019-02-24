E = module.exports = {};

const config = require('../config.js');
const blends = require('../gcp/blends.js');

E.checkAndGiveRoles = async (member) => {
    let res = await blends.getUser(member.id);
    let resData = res.data();
    if (resData.count >= 30) {
        return E.giveRegular(member);
    }
    else if (resData.count >= 10) {
        return E.giveVisitor(member);
    }
    else {
        return Promise.resolve(false);
    }
}

E.giveVisitor = (member) => {
    return member.addRole(config.VISITOR_ROLE);
}

E.giveRegular = (member) => {
    if (member.roles.has(config.VISITOR_ROLE)) {
        member.removeRole(config.VISITOR_ROLE);
    }
    return member.addRole(config.REGULAR_ROLE);
}