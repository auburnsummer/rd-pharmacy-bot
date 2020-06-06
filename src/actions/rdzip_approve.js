/*
An action that handles the rdzip@inspect command. */

const sugar = require('../rdzips/rdlevel_sugar.js');
const sheetj = require('../sheets/sheet_json.js');


module.exports = async (message, results) => {
    console.log('verify');
    await sheetj.verifyLevel(results[1],true);
    

} 