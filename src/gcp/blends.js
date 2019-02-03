const fireClient = require('./firestore_singleton.js');
const COLLECTION_NAME = "dailyblend";

module.exports.getUser = (userID) => {
    let collection = fireClient.collection(COLLECTION_NAME);
    let query = collection.where("id", "==", userID);
    return query.get()
    .then( (data) => {
        return data.docs[0].data();
    })
}