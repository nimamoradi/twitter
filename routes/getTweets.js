const express = require('express');
const router = express.Router();
const models = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const allUserTweet = require('../controler/allUsersTweet');

/* GET users listing. */
router.get('/', function (req, res, next) {

    models.User.findAll({
        where: {
            id: {
                $gt: 1100,
                $lt: 1200
            }
        }
    }).then(
        userResponse => {
            for (let i = 0; i < userResponse.length; i++) {
                allUserTweet(req, res, userResponse[i])
            }
        })
        .catch(error => {
            res.status(400).send(error)
        });
});


module.exports = router;
