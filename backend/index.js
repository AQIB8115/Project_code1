const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();
require('./Models/db');
const userRouter = require('./Routes/userRouter')
const teacherRouter = require('./Routes/teacherRouter');
const adminRouter = require('./Routes/adminRouter');
const bookRouter = require('./Routes/bookRouter');
const pcRouter = require('./Routes/pcRouter');
const borrowRouter = require('./Routes/borrowRouter');

const PORT = process.env.PORT || 5000;

// app.get('/ping ', (req, res) => {
//     res.send('pong');
// })

app.use(bodyParser.json());

app.use(cors());
app.use('/user', userRouter);
app.use('/teacher', teacherRouter);
app.use('/admin', adminRouter);
app.use('/api', bookRouter);
app.use('/api', pcRouter);
app.use('/api', borrowRouter);


app.listen(PORT, () => {
    console.log(`Server is running on  ${PORT}`)
})