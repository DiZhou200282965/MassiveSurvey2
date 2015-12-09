// Import mongoose 
var mongoose = require('mongoose');

// Alias for mongoose.Schema
var Schema = mongoose.Schema;

var SurveyAnswerSchema = new Schema(
    {
        surveyId: int,        
        twoOptionAns:
        [
            twoOptionChoice: int, //or boolean?
        ],
        multipleChoiceAns:
        [{
            mulQueId: int,
            mulOptChoice: [int] //?? not sure
        }],
        shortAnswer:[String],
        submitted_at:
            {
                type: Date, default: Date.now
            }
    }, {
        collection: 'surveyAnswers'
    });



module.exports = mongoose.model('SurveyAnswer', SurveyAnswerSchema);