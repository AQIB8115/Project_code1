
const BookModel = require('../Models/book');
const BorrowModel = require('../Models/borrow');
const UserModel = require('../Models/user');
const FacaultyborrowModel = require('../Models/facaultyborrow');

exports.borrowBook = async (req, res) => {
    const { studentID, username, phone, BookID, Title, AccNo } = req.body;

    try {

        const book = await BookModel.findOne({ BookID: BookID });
        const user = await UserModel.findOne({ studentID: studentID });
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (book.Quantity <= 0) {
            return res.status(400).json({ message: 'Book is out of stock' });
        }

        const borrowModel = new BorrowModel({
            studentID,
            username,
            phone,
            Title,
            AccNo,
            BookID,
            borrowDate: new Date(),
            dueDate: new Date(new Date().setDate(new Date().getDate() + 14))
        });

        await borrowModel.save();

        book.Quantity -= 1;
        await book.save();

        res.status(200).json({ message: 'Book borrowed successfully', borrow: borrowModel });
        
    } catch (error) {
        console.error("Error borrowing the book:", error);

        res.status(500).json({ message: 'Error borrowing the book', error: error.message || error });
    }
};
exports.ListBorrowed = async (req, res) => {
    try {
        const borrowedBooks = await BorrowModel.find();
        res.json(borrowedBooks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching borrowed books', error });
    }
};
exports.returnBook = async (req, res) => {
    try {
        const { borrowId } = req.params;

        const borrowRecord = await BorrowModel.findById(borrowId);
        if (!borrowRecord) {
            return res.status(404).json({ message: "Borrow record not found" });
        }

        const book = await BookModel.findOne({ BookID: borrowRecord.BookID });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        book.Quantity += 1;
        await book.save();

        await BorrowModel.findByIdAndDelete(borrowId);

        res.status(200).json({ message: "Book returned and borrow record removed successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
exports.facaultyborrowBook = async (req, res) => {
  try {
    const { email, username, phone, BookID, Title, AccNo } = req.body;

    const book = await BookModel.findOne({ BookID });

    if (!book || book.Quantity < 1) {
      return res.status(400).json({ message: 'Book not available for borrowing' });
    }

    const borrow = new FacaultyborrowModel({
      email,
      username,
      phone,
      BookID,
      Title,
      AccNo,
      dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months from now
    });

    await borrow.save();

    book.Quantity -= 1;
    await book.save();

    res.status(201).json({ message: 'Book borrowed successfully', borrow });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error borrowing book' });
  }
};
exports.facaultyreturnBook = async (req, res) => {
  try {
    const { id } = req.params;

    const borrow = await FacaultyborrowModel.findById(id);

    if (!borrow) {
      return res.status(404).json({ message: 'Borrow record not found' });
    }

    const book = await BookModel.findOne({ BookID: borrow.BookID });

    if (book) {
      book.Quantity += 1;
      await book.save();
    }

    await FacaultyborrowModel.findByIdAndDelete(id);

    res.status(200).json({ message: 'Book returned and borrow record deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error returning book' });
  }
};
exports.FacaultyListBorrowed = async (req, res) => {
    try {
        const borrowedBooks = await FacaultyborrowModel.find();
        res.json(borrowedBooks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching borrowed books', error });
    }
};