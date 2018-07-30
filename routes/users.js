var express = require('express');
var router = express.Router();
const models = require('../models/index');
/* GET users listing. */
router.get('/', function (req, res, next) {

    models.User.findAll({}).then(userResponse => {
        res.json((userResponse));
    })
        .catch(error => {
            res.status(400).send(error)
        });

});

module.exports = router;
