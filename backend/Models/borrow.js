const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BorrowSchema = new Schema({
  studentID: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  BookID: {
    type: Number,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  AccNo: {
    type: Number,
    required: true,
  },
  borrowDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

const BorrowModel = mongoose.model('borrows', BorrowSchema);
module.exports = BorrowModel;