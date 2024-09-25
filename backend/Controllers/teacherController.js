const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const FacaultyModel = require("../Models/teacher");
const BookModel = require("../Models/book")

exports.signup = async (req, res) => {
    try{
        const { username, email, password, phone } = req.body;
        const user = await FacaultyModel.findOne({ email });
        if(user) {  
            return res.status(409)
                .json({ message: 'User already exist, you can login', success: false})
        }
        const facaultyModel = new FacaultyModel({ username, email, password, phone });
        facaultyModel.password = await bcrypt.hash(password, 10);
        await facaultyModel.save();
        res.status(201)
            .json({
                    message: "Signup successfully",
                    success: true
            })
    } catch (err) {
        res.status(500)
        .json({
                message: "Internal server error",
                success: false
        })
    }

}

exports.login = async (req, res) => {
    try{
        const { password, email } = req.body;
        const user = await FacaultyModel.findOne({ email });
        const errorMsg = 'Auth failed email and Password is incorrect';
        if(!user) {  
            return res.status(403)
                .json({ message: errorMsg, success: false})
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false})
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        res.status(200)
            .json({
                    message: "Login success",
                    success: true,
                    jwtToken,
                    email,
                    phone: user.phone,
                    username: user.username
            })
    } catch (err) {
        res.status(500)
        .json({
                message: "Internal server error",
                success: false
        })
    }

}
exports.getTeachers = async (req, res) => {
    try {
        const teachers = await FacaultyModel.find({});
        res.status(200).json(teachers);  // Return users in JSON format
    } catch (err) {
        res.status(500).json({ message: "Error retrieving users" });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        await FacaultyModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Teacher deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting teacher" });
    }
};
exports.getLimitedBookInfo = async (req, res) => {
    try {
        const books = await BookModel.find({}, 'BookID AccNo Title Subtitle Author Quantity');

        if (!books || books.length === 0) {
            return res.status(404).json({ message: "No books found" });
        }

        res.status(200).json({ message: "Books retrieved successfully", books });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.addTeacher = async (req, res) => {
    const { username, password, phone, email } = req.body;
  
    try {
      const newTeacher = new FacaultyModel({
        username,
        password,
        phone,
        email,
      });

      await newTeacher.save();
  
      res.status(201).json({ message: 'Teacher added successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding Teacher', error: error.message });
    }
  };