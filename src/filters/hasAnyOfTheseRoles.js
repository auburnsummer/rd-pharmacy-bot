// Filter: provide a list of role IDs. If the user has any of these roles, they will be allowed through.

module.exports = (roles) => {
    let final = async (message) => {
        if (message.member) {
            for (role of roles) {
                if (message.member.roles.has(role)) {
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