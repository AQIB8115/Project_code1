
const express = require('express');
const router = express.Router();
const borrowController = require('../Controllers/borrowController');

router.post('/borrow', borrowController.borrowBook);

router.get('/borrowed-books', borrowController.ListBorrowed);

router.delete('/return/:borrowId', borrowController.returnBook);

router.post('/borrowed', borrowController.facaultyborrowBook);

router.delete('/facaultyreturn/:id', borrowController.facaultyreturnBook);

router.get('/facaultyborrowed-books', borrowController.FacaultyListBorrowed);

module.exports = router;