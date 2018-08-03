var express = require('express');
var router = express.Router();
const models = require('../models/index');
/* GET tweets listing. */
router.get('/', function (req, res, next) {

    models.Tweet.findAll({
        include: [
            {model: models.User, as: 'user'},
        ]
    }).then(userResponse => {
        res.json((userResponse));
    })
        .catch(error => {
            res.status(400).send(error)
        });

});

module.exports = router;
