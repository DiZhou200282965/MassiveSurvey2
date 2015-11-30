var express = require('express');
var router = express.Router();
var SURVEY = require('../models/survey.js');

//var testString = "<form><label for=\"test\">test</label><input type=\"text\" name=\"test\" /></form>";

// nov 25
// get
router.get('/', function (req, res, next) {
    res.render('addSurvey', {
        title: 'Create Survey',
        //testString:testString,       
        displayName: req.user ? req.user.displayName : ''
    });
});

//router.post('/', function (req, res, next) {
//    SURVEY.create(req.body, function (err, post) {
//        if (err) {
//            return next(err);
//        }
//        res.json(post);
//    });
//});

router.post('/', function (req, res, next) {
    
    var survey = new SURVEY({
        multipleChoice: { question: { title: req.body.title, options: [req.body.option1,req.body.option2,req.body.option3]} }
    });
    survey.save(function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/addSurvey');
        }
    });

});
//    SURVEY.create({ multipleChoice: { title: req.body.title, content: contents } }, function (err, survey) {
//                if (err) {
//                    return next(err);
//                }
//                console.log(contents);
//                res.json(survey);
//            });
//})


module.exports = router;
