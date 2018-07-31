var express = require('express');
var router = express.Router();
const models = require('../models/index');
/* GET users listing. */
router.get('/', function (req, res, next) {

    models.User.findAll({
        include: [
            {model: models.user_relation, as: 'followers'},
            {model: models.user_relation, as: 'followings'},
        ]
    }).then(userResponse => {
        res.json((userResponse));
    })
        .catch(error => {
            res.status(400).send(error)
        });

});

module.exports = router;
