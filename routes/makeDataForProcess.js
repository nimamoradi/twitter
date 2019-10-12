const mkdirp = require('mkdirp');
const express = require('express');
const router = express.Router();
const models = require('../models/index');

router.get('/', function (req, res, next) {

    models.User.findAll().then(function (result) {
        let i = 0;
        let interval = setInterval(function () {
                if (i === 5000)
                    clearInterval(interval);
                result[i].getTweets();
                i++;

            }, 1400
        );
        let temp = result[0].getTweets();
        res.json(temp);


    });
});

module.exports = router;
