
import React, { useState } from 'react';
import axios from 'axios';

const BorrowBook = ({ book, onClose }) => {
    const [studentID, setStudentID] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleBorrowBook = async (e) => {
        e.preventDefault();

        const borrowData = {
            studentID,
            username,
            phone,
            BookID: book.BookID,
            Title: book.Title,
            AccNo: book.AccNo,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/borrow', borrowData);
            setMessage(response.data.message);
            onClose();
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'Error borrowing the book');
        }
    };

    return (
        <div className="borrow-book-container">
            <h2>Borrow a Book</h2>
            <form onSubmit={handleBorrowBook}>
                <div>
                    <label>Student ID:</label>
                    <input type="text" value={studentID} onChange={(e) => setStudentID(e.target.value)} required />
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <button type="submit">Borrow Book</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
            {message && <p>{message}</p>}
            <style jsx>{`
                .borrow-book-container {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    margin-top: 20px;
                }
                h2 {
                    margin-bottom: 20px;
                }
                input {
                    display: block;
                    margin: 10px 0;
                    padding: 8px;
                    width: 100%;
                }
                button {
                    margin-right: 10px;
                    padding: 5px 10px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default BorrowBook;
