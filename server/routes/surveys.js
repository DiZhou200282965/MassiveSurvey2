var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');

var Survey = require('../models/survey.js');


/* check if user is authenticatd */
function requireAuth(req, res, next){
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}

/* READ Surveys */
router.get('/', requireAuth, function(req, res, next) {
  Survey.find(function(err,surveys){
     if(err){return next(err);}
      res.json(surveys);
  });
});


// SURVEY.create({ multipleChoice: { title: req.body.title, content: contents } }, function (err, survey) {
//                if (err) {
//                    return next(err);
//                }
//                console.log(contents);
//                res.json(survey);
//            });
//________________________
// router.post('/', requireAuth, function(req, res, next){
    
//     var survey = new SURVEY({
//         multipleChoice: { question: { title: req.body.title, options: [req.body.option1,req.body.option2,req.body.option3]} }
//     });
//     survey.save(function (err) {
//         if (err) {
//             console.log(err);
//             res.end(err);
//         }
//         else {
//             res.redirect('/surveys');
//         }
//     });
//   });
//________________________

/* CREATE SURVEYS */
router.post('/', requireAuth, function(req, res, next){
   Survey.create(req.body, function(err, post){
      if(err){
        return next(err);}

      res.json(post);
   });
});

/* READ SURVEYS */
router.get('/', requireAuth, function(req, res, next) {
  Survey.find(function(err,surveys){
     if(err){return next(err);}
      res.json(surveys);
  });
});

/* READ /surveys/id */
router.get('/:id', requireAuth, function(req,res, next) {
   Survey.findById(req.params.id, function(err,post){
      if(err) {
        return next(err);}
       res.json(post);
   });
});

/* UPDATE /surveys/:id */
router.put('/:id', requireAuth, function(req,res, next){
   Survey.findByIdAndUpdate(req.params.id, req.body, function(err, post){
      if(err) {return next(err);}
       res.json(post);
   }); 
});

/* DELETE /surveys/:id */
router.delete('/:id', requireAuth, function(req,res,next){
   Survey.findByIdAndRemove(req.params.id, req.body, function(err,post){
      if(err) {return next(err);}
       res.json(post);
   });
});

// ******************************

// /* CREATE Surveys */
// // router.post('/', requireAuth, function(req, res, next){
// //    SURVEY.create(req.body, function(err, post){
// //       if(err){
// //         return next(err);}

// //       res.json(post);
// //    });
// // });

// //var testString = "<form><label for=\"test\">test</label><input type=\"text\" name=\"test\" /></form>";

// // nov 25
// // get
// // router.get('/', requireAuth, function (req, res, next) {
// //     res.render('surveys/index', {
// //         title: 'Create Survey',
// //         //testString:testString,       
// //         displayName: req.user ? req.user.displayName : ''
// //     });
// // });

// //router.post('/', function (req, res, next) {
// //    SURVEY.create(req.body, function (err, post) {
// //        if (err) {
// //            return next(err);
// //        }
// //        res.json(post);
// //    });
// //});

// router.post('/', requireAuth, function (req, res, next) {
    
//     var survey = new SURVEY({
//         multipleChoice: { question: { title: req.body.title, options: [req.body.option1,req.body.option2,req.body.option3]} }
//     });
//     survey.save(function (err) {
//         if (err) {
//             console.log(err);
//             res.end(err);
//         }
//         else {
//             res.redirect('/surveys');
//         }
//     });

// });
//    SURVEY.create({ multipleChoice: { title: req.body.title, content: contents } }, function (err, survey) {
//                if (err) {
//                    return next(err);
//                }
//                console.log(contents);
//                res.json(survey);
//            });
// })

// ******************************


module.exports = router;
