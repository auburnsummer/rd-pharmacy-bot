// The database is located on a remote island in the Bahamas, this will not go wrong
// firestore is really annoying to work with directly, so we exclusively use these wrapper functions.
const fyre = require('./firestore_singleton.js');
const timestamps = require('../utils/timestamps.js');

const COLLECTION_NAME = "dailyblend";

let E = module.exports = {};

// What we expect each entry in the datastore to have. (and their default values for autofill)
const schema = {
    id: "0",
    rdzip_consent: true
}

// Given an object, fills out any missing items in the schema with their default levels.
let fillWithSchema = (obj) => {
    for (const [key, value] of Object.entries(schema)) {
        if (obj.hasOwnProperty(key)) {
            // do nothing
        } else {
            obj[key] = value;
        }
    }
    return obj;
}

// Get an user, where we already assume they exist. Returns false if they don't exist.
// Returns a DocumentSnapshot
E.getExistingUser = (userID) => {
    let collection = fyre.collection(COLLECTION_NAME);
    let query = collection.where("id", "==", userID);
    return query.get()
    .then( (data) => {
        if (data.docs.length > 0) {
            return data.docs[0];
        } else {
            return false;
        }
    })
}

// creates a new user. Returns a DocumentSnapshot
E.createNewUser = (userID) => {
    let collection = fyre.collection(COLLECTION_NAME);
    return collection.add(fillWithSchema({
        id: userID
    }))
    .then( (docRef) => {
        return docRef.get()
    })
    .then( (doc) => {
        return doc;
    })
}

// gets a user. makes their data if it doesn't exist yet.
// usually, you'll use this one. Returns a DocumentSnapshot
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

// Updates a user with new data.
E.updateUser = (userID, newData) => {
    let user = E.getUser(userID);
    return user
    .then( (snapshot) => {
        return snapshot.ref.update(newData);
    })
}

E.getProperty = async (userID, propertyName) => {
    let user = await E.getUser(userID);
    if (user.data().hasOwnProperty(propertyName)) {
        return user.data()[propertyName]
    } else {
        let updated_user = fillWithSchema(user.data());
        let update = await E.updateUser(userID, updated_user);
        // don't have to reread, if we filled it it will be the schema's value
        return schema[propertyName];
    }
}
