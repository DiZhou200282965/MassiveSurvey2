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
    category: String,
    completed: Boolean,
    username: String,
    twoOption:
    [{
        twoOptionQuestion: String,
        option1: String,
        option2: String
    }],
    multipleChoice:
    [{          
       mcQuestion: String,
       mcChoices: [String]
    }],
    shortAnswer: [String],
    checkBox:
    [{
        cbQuestion: String,
        cbAnswers: [String]
    }],
    rank:
    [{
        rankQuestion: String,
        rankAnswers: [String]
    }],
    scaleQuestion: [String],
    updated_at: {type:Date, default: Date.now}
}, {
    collection: 'surveys'
});



module.exports = mongoose.model('Survey', SurveySchema);