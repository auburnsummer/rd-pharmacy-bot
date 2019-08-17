const {google} = require('googleapis');

const Promise = require('bluebird');

let initialised = false;
let the_sheets;

module.exports = async () => {
    if (initialised) {
        return the_sheets;
    }
    const auth = new google.auth.GoogleAuth({
        // Scopes can be specified either as an array or as a single, space-delimited string.
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    const authClient = await auth.getClient();
    const sheets = google.sheets({
        version: "v4",
        auth: authClient
    });
    the_sheets = sheets;
    initialised = true;
    return the_sheets;
}