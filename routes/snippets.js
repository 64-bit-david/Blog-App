const express = require('express');

const snippetController = require('../controller/snippets');

const router = express.Router();

router.get('/api/snippets', snippetController.getSnippets);

router.post('/api/post-snippet', snippetController.createSnippet);

module.exports = router;