

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
    const [book, setBook] = useState({
        BookID: '',
        Title: '',
        Subtitle: '',
        StatementResponsibility: '',
        Author: '',
        Subauthor: '',
        Type: '',
        AccNo: '',
        Price: '',
        EntryDate: '',
        DDC_No: '',
        AUTH_Mark: '',
        Section: '',
        Reference: false,
        Publisher: '',
        Place: '',
        Year: '',
        Source: '',
        Edition: '',
        Volume: '',
        Pages: '',
        Series: '',
        Language: '',
        Quantity: '',
        ISBN: '',
        Binding: '',
        Status: '',
        Remarks: '',
        Contents: '',
        Notes: '',
        Subject: '',
        keyword: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBook({
            ...book,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });
            if (response.ok) {
                alert('Book created successfully');
                navigate(`/book-details/${book.AccNo}`, { state: { Title: book.Title, AccNo: book.AccNo, Author: book.Author } });
                setBook({
                    BookID: '',
                    Title: '',
                    Subtitle: '',
                    StatementResponsibility: '',
                    Author: '',
                    Subauthor: '',
                    Type: '',
                    AccNo: '',
                    Price: '',
                    EntryDate: '',
                    DDC_No: '',
                    AUTH_Mark: '',
                    Section: '',
                    Reference: false,
                    Publisher: '',
                    Place: '',
                    Year: '',
                    Source: '',
                    Edition: '',
                    Volume: '',
                    Pages: '',
                    Series: '',
                    Language: '',
                    Quantity: '',
                    ISBN: '',
                    Binding: '',
                    Status: '',
                    Remarks: '',
                    Contents: '',
                    Notes: '',
                    Subject: '',
                    keyword: ''
                });
            } else {
                alert('Failed to create book');
            }
        } catch (error) {
            console.error('Error creating book:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Create Book</h2>
            <form onSubmit={handleSubmit} className="book-form">
                {Object.keys(book).map((key) => (
                    key !== 'Reference' ? (
                        <div className="form-group" key={key}>
                            <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                            {key === 'Contents' || key === 'Notes' ? (
                                <textarea 
                                    name={key} 
                                    value={book[key]} 
                                    onChange={handleChange} 
                                    placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
                                    className="form-control"
                                />
                            ) : (
                                <input 
                                    type={key === 'Quantity' ? 'number' : 'text'} 
                                    name={key} 
                                    value={book[key]} 
                                    onChange={handleChange} 
                                    placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
                                    className="form-control"
                                />
                            )}
                        </div>
                    ) : (
                        <div className="form-group" key={key}>
                            <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                            <input 
                                type="checkbox" 
                                name={key} 
                                checked={book[key]} 
                                onChange={handleChange} 
                                className="form-checkbox"
                            />
                        </div>
                    )
                ))}
                <button type="submit" className="submit-button">Create Book</button>
            </form>
            <style jsx>{`
                .form-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                    background: #f9f9f9;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    overflow-y: auto;
                    height: calc(100vh - 40px); /* Adjust as needed */
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

                .form-group {
                    display: flex;
                    flex-direction: column;
                }

                .form-group label {
                    margin-bottom: 5px;
                    font-weight: bold;
                }

                .form-control {
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                .form-checkbox {
                    margin-top: 5px;
                }

                .submit-button {
                    grid-column: span 1;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                    margin-top: 20px;
                }

                .submit-button:hover {
                    background-color: #0056b3;
                }
            `}</style>
        </div>
    );
};

export default CreateBook;