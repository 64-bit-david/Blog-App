const express = require('express');

const usersController = require('../controller/users');

const router = express.Router();

router.get('/account/:userId', usersController.getUser);



module.exports = router;
