import { read } from 'fs';

var axios = require('axios');
var config = require('./config/config');
var formListURL = 'https://www.assessmentcenter.net/ac_api/2014-01/Forms/.json';
var regID = config.regID;
var token = config.token;
var authToken = new Buffer(regID+':'+token, "ascii").toString('base64');
console.log(authToken);
var promises = axios.post(formListURL, null, {
    headers: {'Authorization': 'Basic '+authToken}
}).then((res) => {
    const fs = require("fs");
    const content = JSON.stringify(res.data);

    fs.writeFile("./surveyList.json", content, "utf8", function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    }); 
})
