var Airtable = require('airtable');
require('dotenv').config();

var base = new Airtable({apiKey: process.env.AIR_TABLE_API_KEY}).base('appPVg8E1kQM0fwFW');

exports.getEmailList = () => new Promise((resolve, reject) => {
    base('Upwork Acc').select({
        view: 'Grid view'
    }).firstPage(function(err, records) {
        if (err) { reject(err); }
        resolve(records.filter(record=>record.get("Email") != undefined).map(record=>record.get("Email")));
    });
});
