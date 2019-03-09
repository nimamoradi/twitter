const express = require('express');
const router = express.Router();
const saveUser=require("../controler/saveUserFromFile")

/* GET users listing. */
router.get('/', function (req, res, next) {

    saveUser(req, res, next);

});


module.exports = router;
