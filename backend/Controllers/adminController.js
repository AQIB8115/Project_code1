
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AdminModel = require("../Models/admin");

exports.signup = async (req, res) => {
    try{
        const { username, email, password, phone } = req.body;
        const user = await AdminModel.findOne({ email });
        if(user) {  
            return res.status(409)
                .json({ message: 'admin already exist, you can login', success: false})
        }
        const adminModel = new AdminModel({ username, email, password, phone });
        adminModel.password = await bcrypt.hash(password, 10);
        await adminModel.save();
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
        const user = await AdminModel.findOne({ email });
        const errorMsg = 'Auth failed email and Password is incorrect';
        if(!user)   
        return res.status(403)
        .json({ message: errorMsg, success: false})
        
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
