const { signup, login } = require('../Controllers/userController');    
const { signupValidation, loginValidation } = require('../Middlewares/userValidation');

const { getUsers, deleteUser, addUser, getLimitedBookInfo } = require('../Controllers/userController');

const router = require('express').Router();


router.post('/Signup', signupValidation, signup);
router.post('/login', loginValidation, login);

router.get('/view', getUsers);
router.delete('/view/:id', deleteUser);

router.get('/books', getLimitedBookInfo);

router.post('/add', addUser);

module.exports = router;