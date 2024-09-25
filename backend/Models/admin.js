const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AdminSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true
    },
});

const AdminModel= mongoose.model('admins', AdminSchema);
module.exports = AdminModel;