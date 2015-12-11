var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');
var Survey = require('../models/survey.js');
var SurbeyAns = require('../models/surveyanswer.js');
var tempSurvey;

/* check if user is authenticatd */
function requireAuth(req, res, next){
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}

// Get Home page and render survey list
router.get('/', function(req, res, next) {    
    Survey.find(function(err, surveys) {
        if (err) 
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('index', {
                title: 'Massive Survey',
                displayName: req.user ? req.user.displayName : '',
                surveys: surveys              
            });         
        }
    });
});

//render respondSurvey page
 router.get('/takeSurvey/:id', function(req, res, next) {
     var id = req.params.id;
     Survey.findById(id, function(err, Survey) {
         if (err) {
             console.log(err);
             res.end(err);
         }
         else {            
             res.render('surveys/respondSurvey', {
                 title: "Take Survey",
                 displayName: req.user ? req.user.displayName : '',
                 survey: Survey,               
             });
             tempSurvey = Survey; //take the survey object
         }
     }); 
 });
// submit survey answers
router.post('/takeSurvey/:id', function(req, res, next) {

    var twOptAnsArry = [];
    var mulAnsArry = [];
    var shorAnsArry = [];
    // loop through the questions, find post value by i and stored into object form then push to array
    for (var i = 0; i < tempSurvey.twoOption.length; i++)
    {       
        twOptAnsArry.push({ twoOptionAns: req.body[tempSurvey.twoOption[i]._id] });
    }
    for (var i = 0; i < tempSurvey.multipleChoice.length; i++)
    {
        mulAnsArry.push({ mulOptAns: req.body[tempSurvey.multipleChoice[i]._id] })
    }
    for (var i = 0; i < tempSurvey.shortAnswer.length; i++) {
        shorAnsArry.push({ shrtAns: req.body[i] })
    }

    // store object into db
    SurbeyAns.create({
        surveyId: req.params.id,
        twOptionAns: twOptAnsArry,
        multipleChoiceAns: mulAnsArry,
        shortAnswer: shorAnsArry,
        submitted_at: Date.now()          
    }, function(err, Survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/');//after submission
        }
    });
});


/* GET survey list page. */
router.get('/mySurvey', requireAuth, function(req, res, next) {
  res.render('surveys/index.ejs', { 
      title: 'My Survey List',
      displayName: req.user ? req.user.displayName : '',
      username: req.user ? req.user.username : '' 
  });
});
/*  */
router.get('/mySurvey/create', requireAuth, function (req, res, next) {
    res.render('surveys/index.ejs', {
        title: 'My Survey List',
        displayName: req.user ? req.user.displayName : '',
        username: req.user ? req.user.username : ''
    });
});
/* Render Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/mySurvey')//redirect to mysurvey if logged in
    }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/mySurvey', //redirect after login success
    failureRedirect: '/login',
    failureFlash: true
}));

/* Show Registration Page */
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

/* POST signup data. */
router.post('/register', passport.authenticate('local-registration', {
    //Success go to home Page / Fail go to Signup page
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}));


/* Process Logout Request */
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
