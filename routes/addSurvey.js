var express = require('express');
var router = express.Router();

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

router.post('/', function (req, res, next) {
    res.render('addSurvey', {
        title: 'Create Survey',
        //testString:testString,       
        displayName: req.user ? req.user.displayName : ''
    });
});
module.exports = router;

