const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
    },
    department: {
        type: String,
        required: true,
    },
    password: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true
    },
    studentID: { 
        type: Number, 
        required: true,   
        unique: true
    },
});

const UserModel= mongoose.model('users', UserSchema);
module.exports = UserModel;