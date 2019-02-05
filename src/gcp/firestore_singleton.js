require('dotenv').config();
const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

module.exports = firestore;