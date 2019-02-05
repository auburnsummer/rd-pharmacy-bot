// The database is located on a remote island in the Bahamas, this will not go wrong
const fyre = require('./firestore_singleton.js');
const timestamps = require('../utils/timestamps.js');

const COLLECTION_NAME = "dailyblend";

E = module.exports = {};

E.getExistingUser = (userID) => {
    let collection = fyre.collection(COLLECTION_NAME);
    let query = collection.where("id", "==", userID);
    return query.get()
    .then( (data) => {
        if (data.docs.length > 0) {
            return data.docs[0].data();
        } else {
            return false;
        }
    })
}

// creates a new user.
E.createNewUser = (userID) => {
    let collection = fyre.collection(COLLECTION_NAME);
    return collection.add({
        id: userID,
        lastDrinkTimestamp: 1,
        count: 0,
    })
    .then( (docRef) => {
        return docRef.get()
    })
    .then( (doc) => {
        console.log(doc);
        return doc.data();
    })
}

E.updateUser = (userID, newData) => {
    let collection = fyre.collection(COLLECTION_NAME);
    let query = collection.where("id", "==", userID);
    return query.get()
    .then( (data) => {
        console.log(data.docs[0]);
        return data.docs[0].ref.update(newData);
    })
}

// gets a user. makes their data if it doesn't exist yet.
E.getUser = (userID) => {
    return E.getExistingUser(userID)
    .then ( (doc) => {
        if (doc) {
            return doc;
        } else {
            return E.createNewUser(userID);
        }
    })
}

E.lastBlendTime = () =>  {
    return E.getExistingUser("METADATA")
    .then ( (data) => {
        return data.blendTimestamp;
    })
}

E.drink = async (userID, timestampOfPost) => {
    let arr = await Promise.all([E.lastBlendTime(), E.getUser(userID)]);
    let lastBlend = arr[0];
    let user = arr[1];
    let lastDrink = user.lastDrinkTimestamp;
    // the timestamp they drank needs to be BEFORE the timestamp the blend was posted
    // or in other words, if they've drank AFTER the blend timestamp, they've already drank today!
    if (lastDrink > lastBlend) {
        return Promise.resolve(false);
    }
    // otherwise, they're good to drink!
    let newData = {
        count: user.count + 1,
        lastDrinkTimestamp: timestampOfPost,
    }
    return E.updateUser(userID, newData);
}