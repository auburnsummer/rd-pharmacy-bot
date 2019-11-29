const S = require('./spreadsheet.js');

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
    star_reason: ""
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

E.updateLevel = async (url, intern) => {
    let sheet = await S();
    let response = await sheet.spreadsheets.values.get({
        spreadsheetId : process.env.SPREADSHEET_ID,
        range :  'JSON!A1:A',
        majorDimension: 'COLUMNS'
    });
    let targetIndex;
    for ([index, s] of response.data.values[0]) {
        try {
            let res = JSON.parse(s);
            if (res.download_url === url) {
                targetIndex = index;
            }
        } catch (error) {
            
        }
    }
    if (targetIndex === undefined) {
        throw new Error("Could not find that url");
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