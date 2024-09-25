const router = require('express').Router();
const { signupValidation, loginValidation } = require('../Middlewares/teacherValidation');

const { signup, login, getTeachers, deleteTeacher, getLimitedBookInfo, addTeacher} = require('../Controllers/teacherController');

router.post('/signup', signupValidation, signup)
router.post('/login', loginValidation, login)

router.get('/view', getTeachers);
router.delete('/view/:id', deleteTeacher);

router.get('/books', getLimitedBookInfo);

router.post('/add', addTeacher);

module.exports = router;