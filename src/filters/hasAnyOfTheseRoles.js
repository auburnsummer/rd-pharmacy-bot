// Filter: provide a list of role IDs. If the user has any of these roles, they will be allowed through.

module.exports = (roles) => {
    let final = async (message) => {
        if (message.member) {
            const keys = [...message.member.roles.cache.keys()];
            for (role of roles) {
                if (keys.includes(role)) {
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    }
    return final;
}
