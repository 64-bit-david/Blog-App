const express = require('express');

const isAuth = require('../middleware/isAuth');

const storyController = require('../controller/story');

const router = express.Router();

router.get('/api/stories', storyController.getStories);

router.get('/api/stories/:storyId', storyController.getStory);

router.get('/api/stories/:storyId', storyController.getStory);

router.post('/api/stories/comments/:storyId', storyController.postStoryComment);

router.post('/api/create-story', isAuth, storyController.addStory);

router.put('/api/stories/:storyId', isAuth, storyController.editStory);

router.delete('/api/stories/:storyId', isAuth, storyController.deleteStory);

module.exports = router;