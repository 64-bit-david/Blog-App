const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../middleware/isAuth');

const storyController = require('../controller/story');

const router = express.Router();

router.get('/api/stories', storyController.getStories);

router.get('/api/stories/:storyId', storyController.getStory);

router.post('/api/stories/comments/:storyId',
  body('commentText', 'comments have a max length of 150 characters')
    .isLength({ max: 150 })
  , storyController.postStoryComment);

router.post('/api/create-story', isAuth,

  body('title', 'titles have a max limit of 100 characters')
    .isLength({ max: 100 }),
  body('description', 'Descriptions should be no longer than 250 characters')
    .isLength({ max: 250 }),
  body('content', 'Story has a max allowed length of 10,000 characters')
    .isLength({ max: 10000 })

  , storyController.addStory);

router.put('/api/stories/:storyId', isAuth,

  body('title', 'titles have a max limit of 100 characters')
    .isLength({ max: 100 }),
  body('description', 'Descriptions should be no longer than 250 characters')
    .isLength({ max: 250 }),
  body('content', 'Story has a max allowed length of 10,000 characters')
    .isLength({ max: 10000 })

  , storyController.editStory);

router.delete('/api/stories/comments/:storyId/:commentId', storyController.deleteComment);
router.delete('/api/stories/:storyId', isAuth, storyController.deleteStory);

module.exports = router;