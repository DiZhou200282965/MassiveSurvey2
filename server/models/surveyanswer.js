// Import mongoose 
var mongoose = require('mongoose');

// Alias for mongoose.Schema
var Schema = mongoose.Schema;

var SurveyAnswerSchema = new Schema(
    {
        surveyId: String,
        twOptionAns:
        [{
            twoOptionAns: String
        }],
         multipleChoiceAns:
         [{  
            mulOptAns: String
         }],
         shortAnswer:
         [{
     
            shrtAns: String
         }],
        submitted_at:
        {
            type: Date, default: Date.now
        }
    }, {
        collection: 'surveyAnswers'
    });



module.exports = mongoose.model('SurveyAnswer', SurveyAnswerSchema);