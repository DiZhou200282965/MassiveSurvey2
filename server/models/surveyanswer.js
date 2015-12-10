// Import mongoose 
var mongoose = require('mongoose');

// Alias for mongoose.Schema
var Schema = mongoose.Schema;

var SurveyAnswerSchema = new Schema(
    {
        // surveyId: String,
        twOptionAns:
        [String],
        // multipleChoiceAns:
        // [{
        //     mulQueId: Number,
        //     mulOptAns: String
        // }],
        // shortAnswer:
        // [{
        //     shrtAnsId: Number,
        //     shrtAns: String
        // }],
        submitted_at:
        {
                type: Date, default: Date.now
        }
    }, {
        collection: 'surveyAnswers'
    });



module.exports = mongoose.model('SurveyAnswer', SurveyAnswerSchema);