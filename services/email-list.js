var Airtable = require('airtable');
var base = new Airtable({apiKey: 'patzePypueD0h6Hub.ed29235988ef3f776136c7162471ac867a73ce3b0b394f6889e8a00c6c5a69bf'}).base('appPVg8E1kQM0fwFW');

exports.getEmailList = () => new Promise((resolve, reject) => {
    base('Upwork Acc').select({
        view: 'Grid view'
    }).firstPage(function(err, records) {
        if (err) { reject(err); }
        resolve(records.filter(record=>record.get("Email") != undefined).map(record=>record.get("Email")));
    });
});
