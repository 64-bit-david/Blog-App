const express = require('express');

const snippetController = require('../controller/snippets');

const router = express.Router();

router.get('/api/snippets', snippetController.getSnippets);

router.post('/api/post-snippet', snippetController.createSnippet);

router.delete('/api/snippet/:snippetId', snippetController.deleteSnippet);

module.exports = router;