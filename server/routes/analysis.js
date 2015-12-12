var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');

var SurveyAnswer = require('../models/surveyanswer.js');
var Survey = require('../models/survey.js');
var mySurveys;
/* check if user is authenticatd */
function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
};

// Get survey list under current user
router.get('/', requireAuth, function (req, res, next) {
    Survey.find({ username: req.user.username }, function (err, surveys) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //console.log(surveys.length);
            mySurveys = surveys;
            res.render('analysis/index', {
                title: 'Analysis',
                displayName: req.user ? req.user.displayName : '',
                surveys: surveys
            });
        }
    });
});

// GET the current survey analysis
router.get('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;

    // get the current survey
    //#############################Original code
    //var tempSurvey = Survey.find({_id: id}, function(err,tempSurvey){
    //  tempSurveyA = tempSurvey;
    //  console.log(tempSurveyA.name);
    //################################## modified block ###############
    Survey.findById(id, function (err, survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            var tempSurvey = survey;
            //console.log("###### Name :"+tempSurvey.name); // for test###
            SurveyAnswer.find({ surveyId: id }, function (err, surveyAnsArry) {
                if (err) {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    var tempSurveyAnsArry = surveyAnsArry;
                    // error handler
                    var flag = false;
                    for (var i = 0; i < tempSurveyAnsArry.length; i++) {
                        if (tempSurveyAnsArry[i].twOptionAns == undefined || tempSurveyAnsArry[i].multipleChoiceAns == undefined || tempSurveyAnsArry[i].twOptioshortAnswernAns == undefined) {
                            flag = true;
                        }
                    }// if there is undefiend answer, redirect to home page
                    if (flag)
                    {
                        console.log("no");
                        res.render('analysis/index', {
                            title: 'Analysis',
                            displayName: req.user ? req.user.displayName : '',
                            surveys: mySurveys
                        });
                    }
                    else
                    {
                        //console.log("###### tempSurveyAnsArry length :" + tempSurveyAnsArry.length);// for test###
                        //console.log("###### answer :" + tempSurveyAnsArry[0].twOptionAns[0].twoOptionAns);// for test###
                        // start of calculation

                        // for tow Option
                        var opt1Count = 0;
                        for (var i = 0; i < tempSurveyAnsArry.length; i++) {
                            if (tempSurveyAnsArry[i].twOptionAns[0].twoOptionAns === tempSurvey.twoOption[0].option1)
                                opt1Count++;
                        }
                        console.log("###### Count :" + opt1Count);// for test###
                        //end of calculation
                        res.render('analysis/result', {
                            title: "Survey Answer Details",
                            displayName: req.user ? req.user.displayName : '',
                            tempSurveyAnsArry: tempSurveyAnsArry,
                            tempSurvey: tempSurvey,
                            opt1Count: opt1Count,
                        });
                    }
                }

            });// end of surveyAnswer find by ID
        }
    });// end of survey find by ID

});// end of get /:Id

//  var SurveyAnswerA = SurveyAnswer.find({surveyId: id}, function(err, SurveyAnswer) {
//  SurveyAnswerA = SurveyAnswer;
// // console.log(SurveyAnswerA);
//    // analyzing choice of two-option questions
//  var option1Arr = [];
//  var option2Arr = [];    
//  for (var i = 0; i < SurveyAnswer.length; i++) 
//  {
// //   console.log(i);
//    // for each question
//    var option1 = 0;
//  //  console.log(option1);
//    var option2 = 0;
//  //  console.log(tempSurvey.name);
//    for (var j = 0; j < SurveyAnswerA[i].twOptionAns.length; j++) 
//    {
//   //   console.log(j);
//      if (SurveyAnswerA[i].twOptionAns[j].twoOptionAns == tempSurveyA.twoOption[j].option1)
//      {
//        option1 = option1 + 1;
//    //    console.log(option1);
//      }
//      if (SurveyAnswerA[i].twOptionAns[j].twoOptionAns == tempSurveyA.twoOption[j].option2)
//      {
//        option2++;
//      }
//    }      
//    option1Arr[i] = option1;
//  //  console.log(option1Arr);
//    option1Arr.push(option2);
//  }
////  console.log(option1Arr);

//    });


//     }
// });
////   console.log(tempSurvey);
//  // get the answers for this survey


// SurveyAnswer.find({surveyId: id}, function(err, SurveyAnswer) {
//   if (err) 
//   {
//     console.log(err);
//     res.end(err);
//   }
//   else 
//   {
//      res.render('analysis/result', {
//         title: "Survey Answer Details",
//         displayName: req.user ? req.user.displayName : '',
//         surveyanswers: SurveyAnswer
//          tempSurvey: tempSurvey,
//       });
//   }
// });
//});




module.exports = router;
