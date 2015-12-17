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
                        if (tempSurveyAnsArry[i].twOptionAns === undefined || tempSurveyAnsArry[i].multipleChoiceAns === undefined || tempSurveyAnsArry[i].shortAnswer === undefined) {
                            flag = true;
                        }
                    }
                    // if there is undefiend answer, redirect to home page
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

                        /* start of calculation */

                        // Calculation for tow Option
                        var arryCount = [];
                        for (var i = 0; i < tempSurveyAnsArry.length; i++) {                                            
                            for (var k = 0; k < tempSurveyAnsArry[i].twOptionAns.length; k++) {
                                if (tempSurveyAnsArry[i].twOptionAns[k].twoOptionAns === tempSurvey.twoOption[k].option1){
                                    arryCount.push(0);                                     
                                    arryCount[k] += 1;                                    
                                }
                            }                           
                        };
                        // #########Calculation for Multiple Choice
                        var mulCount = []; //    [[],[],[],[],[]]
                        for (var i = 0; i < tempSurveyAnsArry.length; i++) {
                            for (var k = 0; k < tempSurveyAnsArry[i].multipleChoiceAns.length; k++) {
                                for (var j = 0; j < tempSurvey.multipleChoice[k].mulOpt.length; j++) {
                                    mulCount.push([]);
                                    if (tempSurveyAnsArry[i].multipleChoiceAns[k].mulOptAns === tempSurvey.multipleChoice[k].mulOpt[j]) {
                                    mulCount[j].push(0);
                                    mulCount[j][k] += 1;
                                    } 
                                }
                            }
                        };
                 
                      
              
                    //  aryname[0][0]=1
                       // console.log("survey length: " + tempSurveyAnsArry[0].twOptionAns[0].twoOptionAns);
                        console.log("###### array :" + mulCount);// for test###
                        //end of calculation
                        res.render('analysis/result', {
                            title: "Survey Answer Details",
                            displayName: req.user ? req.user.displayName : '',
                            tempSurveyAnsArry: tempSurveyAnsArry,
                            tempSurvey: tempSurvey,
                            arryCount: arryCount,
                            mulCount: mulCount
                        });
                    }
                }

            });// end of surveyAnswer find by ID
        }
    });// end of survey find by ID

});// end of get /:Id




module.exports = router;
