const express = require('express');

const isAuth = require('../middleware/isAuth');

const postController = require('../controller/posts');

const router = express.Router();

router.get('/api/posts', postController.getPosts);

router.get('/api/posts/:postId', postController.getPost);

router.post('/api/create-post', isAuth, postController.addPost);

router.put('/api/posts/:postId', isAuth, postController.editPost);

router.delete('/api/posts/:postId', isAuth, postController.deletePost);

module.exports = router;