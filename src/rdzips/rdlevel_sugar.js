/*
So that the bot can handle levels from multiple sources,
this module handles getting everything into a consistent internal format.
*/

let E = module.exports = {};

const imgur = require('imgur');

const { Client, RichEmbed } = require('discord.js');
const download = require('../utils/download.js');

const Promise = require('bluebird');
const fs = require('fs');
const readFile_p = Promise.promisify(fs.readFile);
const unlink_p = Promise.promisify(fs.unlink);

const jszip = require('jszip');

const JSON5 = require('json5');

const uuidv4 = require('uuid/v4');


// get an internal representation from a URL pointing to an RDZIP
E.makeInternFromURL = async (url) => {
    // Download the file to a temporary file designated by a UUID
    let filename = uuidv4() + ".zip"

    try {
        await download(url, filename);
    } catch (error) {
        console.log(error);
        return Promise.reject("Download error.");
    }

    let rdlevel;
    let zip;
    let last_updated;
    // Try to unzip the file.
    try {
        let data = await readFile_p(filename);
        zip = await jszip.loadAsync(data);
        rdlevel_file = zip.file('main.rdlevel');
        last_updated = rdlevel_file.date;
        rdlevel = await rdlevel_file.async('string');
    } catch (error) {
        console.log(error);
        return Promise.reject("Zip error. Is this a rdzip? | " + error);
    }

    let obj;
    // Extract relevant information from the rdlevel file.
    try {
        obj = JSON5.parse(rdlevel.trim());
    } catch (error) {
        return Promise.reject("JSON5 error. The main.rdlevel might be malformed. | " + error);
    }

    let preview_img = E.getPreviewImage(obj);
    let preview_img_base64 = await zip.file(preview_img).async('base64');

    let level = await E.makeInternFromRdlevel(obj, preview_img_base64, url, last_updated);
    // Delete the tempfile..
    await unlink_p(filename);
    return level;
}

E.getPreviewImage = (rdobj) => {
    return rdobj.settings.previewImage;
}

findBPMs = (rdobj) => {
    let bpms = [];
    for (e of rdobj.events) {
        if (e.type === 'PlaySong') {
            bpms.push(e.bpm);
        }
        if (e.type === 'SetBeatsPerMinute') {
            bpms.push(e.beatsPerMinute)
        }
    }
    return bpms;
}

let defaultUndefined = (test, defaultValue) => {
    return (test === undefined) ? defaultValue : test;
}

// from a json5 parsed object
E.makeInternFromRdlevel = async (rdobj, preview_img, download_url, last_updated) => {
    let final = {}
    final.download_url = download_url;
    final.last_updated = last_updated;
    final.song = rdobj.settings.song;
    final.artist = rdobj.settings.artist;
    final.author = rdobj.settings.author;
    final.description = rdobj.settings.description;
    let bpms = findBPMs(rdobj);
    final.max_bpm = Math.max(...bpms);
    final.min_bpm = Math.min(...bpms);
    final.difficulty = defaultUndefined(rdobj.settings.difficulty, "Medium");
    final.seizure_warning = defaultUndefined(rdobj.settings.seizureWarning, false);
    final.tags = rdobj.settings.tags.split(',').map( (s) => {return s.trim()} );
    final.single_player = ["OnePlayerOnly", "BothModes"].includes(rdobj.settings.canBePlayedOn)
    final.two_player = ["TwoPlayerOnly", "BothModes"].includes(rdobj.settings.canBePlayedOn)
    try {
        let json = await imgur.uploadBase64(preview_img);
        final.preview_img = json.data.link;
    
    } catch (error) { // couldn't upload it? could be a malformed png
        final.preview_img = false;
    }
    return final;
}

E.makeEmbed = (level) => {
    let tags = level.tags.map( (t) => {return `**[${t}]**`}).join(", ");
    let players = (level.single_player ? "1P " : "") + (level.two_player ? "2P" : "");

    embed = new RichEmbed()
    .setAuthor(`${level.song} -- ${level.artist}`)
    .setTitle(`Level Creator: ${level.author}`)

    if (level.description) {
        topEmbed.addField('Description', level.description, false)
    }

    embed
    .addField("Tags", tags, false)
    .addField("Modes", players, true)
    .addField("Difficulty", level.difficulty, true)
    .addField("Download", `[Link](${level.download_url})`, true)
    .setImage(level.preview_img);

    return embed;
}

E.makeBlendEmbeds = (level) => {
    let tags = level.tags.map( (t) => {return `**[${t}]**`}).join(", ");
    let players = (level.single_player ? "1P " : "") + (level.two_player ? "2P" : "");

    let datetime = new Date()

    let topEmbed = new RichEmbed()
    .setAuthor(`Daily Blend: ${datetime.toDateString()}`)
    .addField('Level', `${level.artist} - ${level.song}`, true)
    .addField('Creator', level.author, true)

    if (level.description) {
        topEmbed.addField('Description', level.description, false)
    }

    topEmbed
    .addField("Tags", tags, false)
    .addField("Modes", players, true)
    .addField("Difficulty", level.difficulty, true)
    .addField("Download", `[Link](${level.download_url})`, true)
    .setImage(level.preview_img)
    .setColor('PURPLE');

    let bottomEmbed = new RichEmbed()
    .setAuthor('About the Daily Blend Café')
    .setDescription(`
The Daily Blend Café is like a book club for custom levels! Play the daily level and post your score (press shift-o after loading the level to enable detailed scoring), and leave a comment with what you liked about the level!
`);

    embeds = [topEmbed, bottomEmbed];
    return embeds;
}
