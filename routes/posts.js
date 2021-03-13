const express = require('express');


const postController = require('../controller/posts');

const router = express.Router();

router.get('/', postController.getPosts);

router.get('/posts/:postId', postController.getPost);

router.post('/create-post', postController.addPost);

router.put('/posts/:postId', postController.editPost);

router.delete('/posts/:postId', postController.deletePost);

module.exports = router;