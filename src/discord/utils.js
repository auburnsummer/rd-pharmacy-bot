let E = module.exports = {};

// AssumedName takes a member and spits out what we should call them.
// for now it just takes their nickname, but we could do stuff like stripping out zalgo text etc here
E.assumedName = (member) => {
    if (member.nickname) {
        return member.nickname;
    } else {
        return member.user.username;
    }
}