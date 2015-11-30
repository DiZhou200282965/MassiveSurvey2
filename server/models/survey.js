// Import mongoose 
var mongoose = require('mongoose');


// Alias for mongoose.Schema
var Schema = mongoose.Schema;

// Define user Schema
var SurveySchema = new Schema({
    //userId: String,
   multipleChoice:
        {          
           question: [{
                title: String,
                options: [String]
                     }]
           
        },   
    //tureFalse:
    //    {

    //    },
    //created: Number,
    //updated: Number
}, {
    collection: 'Survey'
});



module.exports = mongoose.model('Survey', SurveySchema);