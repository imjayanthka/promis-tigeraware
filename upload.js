var firbaseAdmin = require('firebase-admin');
var config = require('./config/config');
firbaseAdmin.initializeApp({
    credential: firbaseAdmin.credential.cert(config.credDev),
    databaseURL: config.databaseURLDev
});


const testFolder = './data/';
const fs = require('fs');
firbaseAdmin.database().ref('templates/').remove();
fs.readdirSync(testFolder).forEach(file => {
  console.log(file);
  if(file.endsWith('.json')){
    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync('./data/'+file, 'utf8'));
    firbaseAdmin.database().ref('templates/').push().set(obj);
  }
})