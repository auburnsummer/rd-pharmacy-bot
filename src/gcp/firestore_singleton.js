require('dotenv').config();
const Firestore = require('@google-cloud/firestore');
const fire = new Firestore();

module.exports = fire;