const router = require('express').Router();
const { signupValidation, loginValidation } = require('../Middlewares/adminValidation');

const { signup, login } = require('../Controllers/adminController');

router.post('/signup', signupValidation, signup)
router.post('/login', loginValidation, login)


module.exports = router;