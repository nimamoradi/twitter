var express = require('express');
var router = express.Router();
const models = require('../models/index');
const data = require('../data/data');
const saveUser = require('../saveData/saveUser');
/* GET tweets listing. */
router.get('/', function (req, res, next) {
    res.json(saveUser(data))
    // models.Tweets.findAll({
    //     include: [
    //         {model: models.User, as: 'user'},
    //     ]
    // }).then(userResponse => {
    //     res.json((userResponse));
    // })
    //     .catch(error => {
    //         res.status(400).send(error)
    //     });

});

module.exports = router;
