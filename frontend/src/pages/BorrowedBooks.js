import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BorrowedBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/borrowed-books');
                setBorrowedBooks(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching borrowed books');
                setLoading(false);
            }
        };

        fetchBorrowedBooks();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="borrowed-books-container">
            <h2>Borrowed Books List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Username</th>
                        <th>Phone</th>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>AccNo</th>
                        <th>Borrow Date</th>
                        <th>Return Date</th>
                    </tr>
                </thead>
                <tbody>
                    {borrowedBooks.map((book) => (
                        <tr key={book._id}>
                            <td>{book.studentID}</td>
                            <td>{book.username}</td>
                            <td>{book.phone}</td>
                            <td>{book.BookID}</td>
                            <td>{book.Title}</td>
                            <td>{book.AccNo}</td>
                            <td>{new Date(book.borrowDate).toLocaleDateString()}</td>
                            <td>
                                    {new Date(book.dueDate).toLocaleDateString()}s
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <style jsx>{`
                .borrowed-books-container {
                    margin-top: 20px;
                    padding: 20px;
                    background-color: white;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                }
                h2 {
                    margin-bottom: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 10px;
                    border: 1px solid #ccc;
                    text-align: left;
                }
                th {
                    background-color: #f4f4f4;
                }
            `}</style>
        </div>
    );
};

export default BorrowedBooks;