const express = require('express');

const { body } = require('express-validator');


const usersController = require('../controller/users');

const router = express.Router();

router.get('/account/:userId', usersController.getUser);

router.get('/api/account/stories/:userId', usersController.getUserStories);

router.get('/account/basic/:userId', usersController.getUserBasic);

router.put('/account/update-username',
  body('username', 'Usernames have a max limit of 30 characters')
    .isLength({ max: 30 }),
  body('username', 'Usernames should have at least 5 characters')
    .isLength({ min: 5 }),
  usersController.updateUsername);

router.put('/account/update-desc',
  body('description', 'User Description should have a max limit of 30 characters')
    .isLength({ max: 30 }),
  body('description', 'User description should have at least 5 characters')
    .isLength({ min: 5 }), usersController.updateDesc),
  router.delete('/account/:userId', usersController.deleteUser);






module.exports = router;
