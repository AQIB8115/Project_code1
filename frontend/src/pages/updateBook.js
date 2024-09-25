

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/books/${id}`);
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };

        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBook({
            ...book,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });
            if (response.ok) {
                alert('Book updated successfully');
                navigate('/all-books');
            } else {
                alert('Failed to update book');
            }
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    if (!book) return <p>Loading...</p>;

    return (
        <div className="update-book-container">
            <h2>Update Book</h2>
            <form onSubmit={handleSubmit} className="book-form">
                <div>
                    <label>Book ID</label>
                    <input
                        type="number"
                        name="BookID"
                        value={book.BookID || ''}
                        onChange={handleChange}
                        required
                        disabled
                        placeholder="Enter Book ID"
                    />
                </div>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="Title"
                        value={book.Title || ''}
                        onChange={handleChange}
                        required
                        placeholder="Enter Title"
                    />
                </div>
                <div>
                    <label>Subtitle</label>
                    <input
                        type="text"
                        name="Subtitle"
                        value={book.Subtitle || ''}
                        onChange={handleChange}
                        placeholder="Enter Subtitle"
                    />
                </div>
                <div>
                    <label>Statement Responsibility</label>
                    <input
                        type="text"
                        name="StatementResponsibility"
                        value={book.StatementResponsibility || ''}
                        onChange={handleChange}
                        placeholder="Enter Statement Responsibility"
                    />
                </div>
                <div>
                    <label>Author</label>
                    <input
                        type="text"
                        name="Author"
                        value={book.Author || ''}
                        onChange={handleChange}
                        required
                        placeholder="Enter Author"
                    />
                </div>
                <div>
                    <label>Subauthor</label>
                    <input
                        type="text"
                        name="Subauthor"
                        value={book.Subauthor || ''}
                        onChange={handleChange}
                        placeholder="Enter Subauthor"
                    />
                </div>
                <div>
                    <label>Type</label>
                    <input
                        type="text"
                        name="Type"
                        value={book.Type || ''}
                        onChange={handleChange}
                        placeholder="Enter Type"
                    />
                </div>
                <div>
                    <label>AccNo</label>
                    <input
                        type="number"
                        name="AccNo"
                        value={book.AccNo || ''}
                        onChange={handleChange}
                        placeholder="Enter AccNo"
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        name="Price"
                        value={book.Price || ''}
                        onChange={handleChange}
                        placeholder="Enter Price"
                    />
                </div>
                <div>
                    <label>Entry Date</label>
                    <input
                        type="date"
                        name="EntryDate"
                        value={book.EntryDate ? book.EntryDate.substring(0, 10) : ''}
                        onChange={handleChange}
                        placeholder="Entry Date"
                    />
                </div>
                <div>
                    <label>DDC No</label>
                    <input
                        type="text"
                        name="DDC_No"
                        value={book.DDC_No || ''}
                        onChange={handleChange}
                        placeholder="Enter DDC No"
                    />
                </div>
                <div>
                    <label>AUTH Mark</label>
                    <input
                        type="text"
                        name="AUTH_Mark"
                        value={book.AUTH_Mark || ''}
                        onChange={handleChange}
                        placeholder="Enter AUTH Mark"
                    />
                </div>
                <div>
                    <label>Section</label>
                    <input
                        type="number"
                        name="Section"
                        value={book.Section || ''}
                        onChange={handleChange}
                        placeholder="Enter Section"
                    />
                </div>
                <div>
                    <label>Reference</label>
                    <input
                        type="checkbox"
                        name="Reference"
                        checked={book.Reference || false}
                        onChange={handleChange}
                    />
                    <span>Reference</span>
                </div>
                <div>
                    <label>Publisher</label>
                    <input
                        type="string"
                        name="Publisher"
                        value={book.Section || ''}
                        onChange={handleChange}
                        placeholder="Enter Publisher"
                    />
                </div>
                <div>
                    <label>Place</label>
                    <input
                        type="string"
                        name="Place"
                        value={book.Section || ''}
                        onChange={handleChange}
                        placeholder="Enter Place"
                    />
                </div>
                <div>
                    <label>Year</label>
                    <input
                        type="number"
                        name="Year"
                        value={book.Section || ''}
                        onChange={handleChange}
                        placeholder="Enter Year"
                    />
                </div>
                <div>
                    <label>Source</label>
                    <input
                        type="string"
                        name="Source"
                        value={book.Section || ''}
                        onChange={handleChange}
                        placeholder="Enter Source"
                    />
                </div>
                <div>
                    <label>Edition</label>
                    <input
                        type="string"
                        name="Edition"
                        value={book.Section || ''}
                        onChange={handleChange}
                        placeholder="Enter Edition"
                    />
                </div>
                <div>
                    <label>Volume</label>
                    <input
                        type="string"
                        name="Volume"
                        value={book.Section || ''}
                        onChange={handleChange}
                        placeholder="Enter Volume"
                    />
                </div>
                <div>
                    <label>Pages</label>
                    <input
                        type="number"
                        name="Pages"
                        value={book.Section || ''}
                        onChange={handleChange}
                        placeholder="Enter Pages"
                    />
                </div>
                <div>
                    <label>Series</label>
                    <input
                        type="string"
                        name="Series"
                        value={book.Section || ''}
                        onChange={handleChange}
                        placeholder="Enter Series"
                    />
                </div>
                <div>
                    <label>Language</label>
                    <input
                        type="string"
                        name="Language"
                        value={book.Section || ''}
                        onChange={handleChange}
                        placeholder="Enter Language"
                    />
                </div>
                <div>
                    <label>Quantity</label>
                    <input
                        type="number"
                        name="Quantity"
                        value={book.Section || ''}
                        onChange={handleChange}
                        placeholder="Enter Quantity"
                    />
                </div>
                <div>
                    <label>ISBN</label>
                    <input
                        type="number"
                        name="ISBN"
                        value={book.Section || ''}
                        onChange={handleChange}
                        placeholder="Enter ISBN"
                    />
                </div>
                <div>
                    <label>Binding</label>
                    <input
                        type="string"
                        name="Binding"
                        value={book.Section || ''}
                        onChange={handleChange}
                        placeholder="Enter Binding"
                    />
                </div>
                <div>
                    <label>Status</label>
                    <input
                        type="string"
                        name="Status"
                        value={book.Section || ''}
                        onChange={handleChange}
                        placeholder="Enter Status"
                    />
                </div>
                <div>
                    <label>Remarks</label>
                    <input
                        type="string"
                        name="Remarks"
                        value={book.Section || ''}
                        onChange={handleChange}
                        placeholder="Enter Remarks"
                    />
                </div>
                <div>
                    <label>Contents</label>
                    <input
                        type="string"
                        name="Contents"
                        value={book.Section || ''}
                        onChange={handleChange}
                        placeholder="Enter Contents"
                    />
                </div>
                <div>
                    <label>Notes</label>
                    <input
                        type="string"
                        name="Notes"
                        value={book.Section || ''}
                        onChange={handleChange}
                        placeholder="Enter Notes"
                    />
                </div>
                <div>
                    <label>Subject</label>
                    <input
                        type="string"
                        name="Subject"
                        value={book.Section || ''}
                        onChange={handleChange}
                        placeholder="Enter Subject"
                    />
                </div>
                <div>
                    <label>keyword</label>
                    <input
                        type="string"
                        name="keyword"
                        value={book.Section || ''}
                        onChange={handleChange}
                        placeholder="Enter keyword"
                    />
                </div>
                <button type="submit">Update Book</button>
            </form>

            <style jsx>{`
            .update-book-container {
                margin: 20px;
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 8px;
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
                max-width: 1200px;
                margin: 0 auto;
                position: relative;
                height: calc(100vh - 40px);
                overflow-y: auto;
                }

                 h2 {
                    text-align: center;
                    margin-bottom: 20px;
                    color: #333;
                }

            .book-form {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: 15px;
                
            }

            .book-form div {
                display: flex;
                flex-direction: column;
            }

            .book-form label {
                margin-bottom: 15px;
                font-weight: bold;
            }

            .book-form input[type="text"],
            .book-form input[type="number"],
            .book-form input[type="date"] {
                padding: 8px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }

            .book-form input[type="checkbox"] {
                margin-right: 10px;
            }

            button {
                grid-column: span 1;
                padding: 10px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }

            button:hover {
                background-color: #0056b3;
            }
            `}</style>
        </div>
    );
};

export default UpdateBook;
