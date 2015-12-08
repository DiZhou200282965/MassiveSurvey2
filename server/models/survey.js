// Import mongoose 
var mongoose = require('mongoose');

// Alias for mongoose.Schema
var Schema = mongoose.Schema;

//*******Test by Chang*****
var SurveySchema = new Schema(
    {
        name: String,
        category: String,
        completed: Boolean,
        username: String,
        twoOption:
        [{
            twOptionQuestion: String,
            option1: String,
            option2: String
        }],
        updated_at:
            {
                type: Date, default: Date.now
            }
    }, {
        collection: 'surveys'
    });



module.exports = mongoose.model('Survey', SurveySchema);