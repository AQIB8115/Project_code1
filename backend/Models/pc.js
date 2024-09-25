const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PcSchema = new Schema({
    PcID: { 
        type: Number, 
        required: true, 
        unique: true,
    },
    location: {
        type: Number,
        required: true,
    },
    status: { 
        type: String, 
        required: true 
    },
});

const PcModel= mongoose.model('Pcs', PcSchema);
module.exports = PcModel;