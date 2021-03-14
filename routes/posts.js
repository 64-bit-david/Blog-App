const express = require('express');

const isAuth = require('../middleware/isAuth');

const postController = require('../controller/posts');

const router = express.Router();

router.get('/', postController.getPosts);

router.get('/posts/:postId', postController.getPost);

router.post('/create-post', isAuth, postController.addPost);

router.put('/posts/:postId', isAuth, postController.editPost);

router.delete('/posts/:postId', isAuth, postController.deletePost);

module.exports = router;