const express = require('express');
const router = express.Router();
const models = require('../models/index');

const allUserTweet = require('../controler/allUsersTweet');

/* GET users listing. */
router.get('/', function (req, res, next) {

    models.User.findAll({}).then(
        userResponse => {
            for (let i = 51; i < userResponse.length; i++) {

                allUserTweet(req, res, userResponse[i])
            }
        })
        .catch(error => {
            res.status(400).send(error)
        });
});


module.exports = router;
