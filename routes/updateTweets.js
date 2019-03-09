const express = require('express');
const router = express.Router();
const models = require('../models/index');

router.get('/', function (req, res, next) {
    te(req, res, 1)
    res.send("hello");
});

function te(req, res, count) {
    models.Tweets.findOne({where: {id: count}}).then(function (record) {

            // let record = result[0];
            if (record.text != null && record.text !== "") {
                let text = record.text;
                text = text.replace(new RegExp('\\b' + "https://t.co/" + '\\w+'), '');


                if (record.text !== text) {
                    record.text = text;
                    record.update({
                        text: text,
                    }).then((item) => {
                        te(req, res, count + 1)
                    })
                } else
                    te(req, res, count + 1)
            } else te(req, res, count + 1)
        }
    );
}


module.exports = router;
