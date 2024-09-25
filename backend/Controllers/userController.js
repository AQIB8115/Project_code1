const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/user");
const BookModel = require("../Models/book")

 
exports.signup = async (req, res) => {
    try{
        const { username, department, password, phone, studentID } = req.body;
        const user = await UserModel.findOne({ studentID });
        if(user) {  
            return res.status(409)
                .json({ 
                    message: 'User already exist, you can login', 
                    success: false
                })
        }
        const userModel = new UserModel({ username, department, password, phone, studentID });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                    message: "Signup successfully", 
                    success: true
            });
    } catch (err) {
        res.status(500)
        .json({
                message: "Internal server error", details: err,
                success: false
        });
    }

};
exports.login = async (req, res) => {
    try{
        const { password, studentID } = req.body;
        const user = await UserModel.findOne({ studentID });
        const errorMsg = 'Auth failed ID and Password is incorrect';
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
            { studentID: user.studentID, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        res.status(200)
            .json({
                    message: "Login success",
                    success: true,
                    jwtToken,
                    studentID,
                    department: user.department,
                    username: user.username
            })
    } catch (err) {
        res.status(500)
        .json({
                message: "Internal server error", details: err, 
                success: false
        })
    }

};

exports.getUsers = async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving users" });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await UserModel.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user" });
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
exports.addUser = async (req, res) => {
    const { username, department, password, phone, studentID } = req.body;
  
    try {
      const newUser = new UserModel({
        username,
        department,
        password,
        phone,
        studentID,
      });

      await newUser.save();
  
      res.status(201).json({ message: 'User added successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding user', error: error.message });
    }
  };

