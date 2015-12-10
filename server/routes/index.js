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
             console.log("length of Mul  "+Survey.multipleChoice.length+"  length ofTwo  "+Survey.twoOption.length+"  length of short  "+Survey.shortAnswer.length);
             res.render('surveys/respondSurvey', {
                 title: "Take Survey",
                 displayName: req.user ? req.user.displayName : '',
                 survey: Survey,               
             });
             tempSurvey = Survey;
         }
     }); 
 });
// submit survey answers
router.post('/takeSurvey/:id', function(req, res, next) {
    // var twOptionAnss = Array.prototype.slice.call(req.body.twOptionAns);
    // twOptionAnss.forEach(function (twOptionAns) {
    //   console.log(
    //     'ObjectId' + twOptionAns.id,
    //     'Message' + twOptionAns.twOptAns
    //   );
    // });

    // twOptionAns.forEach(function (twOptionAns){
    //         twOptionAns:        
    //         [{
    //             twOptId: twOptionAns[i]._id,
    //             twOptAns: twOptionAns[i].twOptAns
    //          }]
    //      });
    // var twOptions = Array.prototype.slice.call(req.body.twoOption);
    var arry=[];
    var tempId;
    for (var i = 0; i < tempSurvey.twoOption.length; i++) {
        tempId = tempSurvey.twoOption[i]._id;
        arry.push(req.body.tempId);
    }
   
    SurbeyAns.create({
        // surveyId: req.params.id,
        twOptionAns:     arry   
       
        
        // multipleChoiceAns:
        // [{
        //     mulQueId: req.body.,
        //     mulOptAns: req.body.
        // }],
        // shortAnswer:
        // [{
        //     shrtAnsId: req.body.,
        //     shrtAns: req.body.
        // }]        
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
