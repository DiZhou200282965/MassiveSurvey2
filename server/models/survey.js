// Import mongoose 
var mongoose = require('mongoose');

// Alias for mongoose.Schema
var Schema = mongoose.Schema;

// // Define survey Schema
// var SurveySchema = new Schema({
//     //userId: String,
//    multipleChoice:
//         {          
//            question: [{
//                 title: String,
//                 options: [String]
//                      }]
           
//         },   
//     //tureFalse:
//     //    {

//     //    },
//     //created: Number,
//     //updated: Number    
// }, {
//     collection: 'Survey'
// });

//*******Test by Chang*****
var SurveySchema = new Schema({	
    name: String,
    completed: Boolean,
    username: String,
    multipleChoice:
        {          
           question: String,
           answers: [String]
        },
    updated_at: {type:Date, default: Date.now}
}, {
    collection: 'surveys'
});



module.exports = mongoose.model('Survey', SurveySchema);