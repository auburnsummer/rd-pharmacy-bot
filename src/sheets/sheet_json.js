const S = require('./spreadsheet.js');
const _ = require('lodash');

E = module.exports = {};

// default values for things that don't have them.
const schema = {
    download_url : "MISSING",
    last_updated: "2019-10-03T09:30:08.244Z",
    song: "MISSING",
    artist: "MISSING",
    author: "MISSING",
    description: "MISSING",
    max_bpm: 0,
    min_bpm: 0,
    difficulty: "Medium",
    seizure_warning: false,
    tags: [],
    single_player: true,
    two_player: false,
    preview_img: "MISSING",
    starred: false,
    star_reason: "",
    verified: false
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

E.fillWithSchema = (obj) => {
    for (const [key, value] of Object.entries(schema)) {
        if (obj.hasOwnProperty(key)) {
            // do nothing
        } else {
            obj[key] = value;
        }
    }
    return obj;
}

E.getLevels = async () => {
    let sheet = await S();
    let response = await sheet.spreadsheets.values.get({
        spreadsheetId : process.env.SPREADSHEET_ID,
        range :  'JSON!A1:A',
        majorDimension: 'COLUMNS'
    });
    let processed = []
    for (s of response.data.values[0]) {
        try {
            processed.push(JSON.parse(s))
        } catch (error) {
            // do nothing
        }
    }
    return processed
}

E.verifyLevel = async (url, toSet) => {
    console.log("sanity");
    let sheet = await S();
    let response = await sheet.spreadsheets.values.get({
        spreadsheetId : process.env.SPREADSHEET_ID,
        range :  'JSON!A1:A',
        majorDimension: 'COLUMNS'
    });
    ogresponse = response;
    console.log("response data values");
    // console.log(response.data.values);
    let targetIndex;
    let index = 0;
    for (s of response.data.values[0]) {
        try {
            let res = JSON.parse(s);
            if (res.download_url === url) {
                targetIndex = index;
		console.log(res.verified);
		res.verified=toSet;
		response.data.values[0][index] = JSON.stringify(res);
            }
        } catch (error) {
            
        }
        index++;
    }
    if (targetIndex === undefined) {
        throw new Error("Could not find that url");
    }
    let finished = await sheet.spreadsheets.values.update({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range:  'JSON!A1:A',
	requestBody: ogresponse
    });
    

}

E.updateLevel = async (url) => {
    console.log(url);
    let sheet = await S();
    let response = await sheet.spreadsheets.values.get({
        spreadsheetId : process.env.SPREADSHEET_ID,
        range :  'JSON!A1:A',
        majorDimension: 'COLUMNS'
    });

    let corp = _.filter(_.map(response.data.values[0], (value, index) => {
        try {
            let res = JSON.parse(value);
            return {
                download_url : res.download_url,
                index: index
            }
        }
        catch {
            console.log('blank!');
            return false;
        }
    }));
    let finder = _.find(corp, (r) => r.download_url === url);
    console.log(finder);
    if (finder) {
        console.log('made it here!');
        return sheet.spreadsheets.values.update({
            spreadsheetId : process.env.SPREADSHEET_ID,
            range : `JSON!A${finder.index+1}`
        });
    } else {
        return false;
    }
}

E.removeLevel = async (url) => {
    console.log(url);
    let sheet = await S();
    let response = await sheet.spreadsheets.values.get({
        spreadsheetId : process.env.SPREADSHEET_ID,
        range :  'JSON!A1:A',
        majorDimension: 'COLUMNS'
    });

    let corp = _.filter(_.map(response.data.values[0], (value, index) => {
        try {
            let res = JSON.parse(value);
            return {
                download_url : res.download_url,
                index: index

            }
        }
        catch {
            console.log('blank!');
            return false;
        }
    }));

    let finder = _.find(corp, (r) => r.download_url === url);
    console.log(finder);
    if (finder) {
        console.log('made it here!');
        return sheet.spreadsheets.values.clear({
            spreadsheetId : process.env.SPREADSHEET_ID,
            range : `JSON!A${finder.index+1}`
        });
    } else {
        return false;
    }
}

E.addLevel = async (intern) => {
    let s = JSON.stringify(intern, null, 2);
    let sheet = await S();
    let response = await sheet.spreadsheets.values.append({
        spreadsheetId : process.env.SPREADSHEET_ID,
        range : 'JSON!A1',
        valueInputOption: 'RAW',
        resource: {
            values: [[s]]
        }
    });
    return response;
}