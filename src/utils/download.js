/*
Download.js -- download a URL to the specified location
This will eventually handle google drive, dropbox, etc
*/

const Promise = require('bluebird');
const request = require('request');
const fs = require('fs');
const unlink_p = Promise.promisify(fs.unlink);


module.exports = async (url, filename) => {
    let file = fs.createWriteStream(filename);
    try {
        await new Promise((resolve, reject) => {
            request(url)
            .pipe(file)
            .on('finish', () => {
                resolve('File downloaded.');
            })
            .on('error', () => {
                reject(error);
            })
        }) 
    } catch (error) {
        console.log(error);
        file.destroy();
        // delete the file, it's empty since we didn't actually get a download
        try {
            await unlink_p(filename);
        } catch (error) {
            console.log(error);
        }
        return Promise.reject("Download error.");
    }
    file.destroy();
    return Promise.resolve("Okay!");
}