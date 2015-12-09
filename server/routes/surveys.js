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




module.exports = router;
