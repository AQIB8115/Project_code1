const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FacaultySchema = new Schema({
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

const FacaultyModel= mongoose.model('teachers', FacaultySchema);
module.exports = FacaultyModel;