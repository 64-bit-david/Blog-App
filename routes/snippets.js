const express = require('express');
const { body } = require('express-validator');


const snippetController = require('../controller/snippets');

const router = express.Router();

router.get('/api/snippets', snippetController.getSnippets);

router.get('/api/all-snippets', snippetController.getAllSnippets);

router.post('/api/post-snippet',
  body('snippetText', 'Snippets have a max length of 100 characters')
    .isLength({ max: 100 }),
  snippetController.createSnippet);


router.delete('/api/snippet/:snippetId', snippetController.deleteSnippet);

module.exports = router;