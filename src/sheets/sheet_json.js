const S = require('./spreadsheet.js');

E = module.exports = {};

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