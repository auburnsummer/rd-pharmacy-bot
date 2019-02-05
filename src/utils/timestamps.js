E = module.exports = {};

const Big = require('big.js')

// compares two strings as integers, returns true if t1 is higher than t2
E.compare = (t1, t2) => {
    let b1 = new Big(t1);
    let b2 = new Big(t2);
    return b1.cmp(b2);
}