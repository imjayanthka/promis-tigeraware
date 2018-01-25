if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " SOME_PARAM");
    process.exit(-1);
}
 
var param = process.argv[2];
 
console.log('Param: ' + param);
var axios = require('axios');
var config = require('./config/config');
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('./surveyList.json', 'utf8'));
var regID = config.regID;
var token = config.token;
var authToken = new Buffer(regID+':'+token, "ascii").toString('base64');

console.log(obj.Form.length)
function createSurveySteps(data, surveyName) {
    var survey = [];
    for(var i = 0; i < data.Items.length; i++){
        var steps = {
            title: "",
            id: "",
            type: "",
            subtitle: "",
            choices: [],
            on: "",
            conditionID: ""
        };
        if(data.Items[i].hasOwnProperty('Elements')){
            console.log(i);
            var title = "";
            var choices = [];
            for(var j = 0; j < data.Items[i].Elements.length; j++){
                if(data.Items[i].Elements[j].hasOwnProperty('Map')){
                    data.Items[i].Elements[j].Map.forEach(element => {
                        choices.push(element.Description);
                    }); 
                } else {
                    title = title + ' ' + data.Items[i].Elements[j].Description;
                }
            }
            steps.title = title;
            steps.id = "question-"+(i+1)
            steps.type = "MultipleChoice";
            steps.choices = choices;
            console.log(steps);
            console.log('---------------------');
            survey[i] = steps;
        }
    }
    var surveys = {
        name: surveyName,
        survey: survey
    }
    const fs = require("fs");
    const content = JSON.stringify(surveys);

    fs.writeFile("./data/"+param+".json", content, "utf8", function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    }); 
}

axios.post('https://www.assessmentcenter.net/ac_api/2014-01/Forms/'+obj.Form[parseInt(param)].OID+'.json', "", {
    headers: {'Authorization': 'Basic '+authToken}
}).then((res) => {
    createSurveySteps(res.data, obj.Form[parseInt(param)].Name);
}).catch((err) => {
    console.log(err);
});