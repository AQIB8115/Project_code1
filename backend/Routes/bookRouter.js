const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/bookController');

// router.post('/createBook', bookController.createBook);
router.post('/books', bookController.createBook);
// router.get('/spineLabel/:id', bookController.getSpineLabel)
router.get('/books', bookController.getAllBooks);

router.get('/books/:id', bookController.getBookById);

router.put('/books/:id', bookController.updateBook);

router.delete('/books/:id', bookController.deleteBook);

router.get('/book/:AccNo', bookController.getBookDetails);

module.exports = router;