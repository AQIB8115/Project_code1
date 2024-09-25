
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BorrowBook from './BorrowBook';
import FacaultyBorrowBook from './FacaultyBorrowBook';

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/books');
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleEdit = (id) => {
        navigate(`/update-book/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:5000/api/books/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setBooks(books.filter(book => book._id !== id));
                    alert('Book deleted successfully');
                } else {
                    alert('Failed to delete book');
                }
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };

    const handleBorrow = (book) => {
        setSelectedBook(book);
    };

    const filteredBooks = books.filter(book =>
        book.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.Author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="books-container">
            <h2>All Books</h2>
            <input
                type="text"
                placeholder="Search by Title or Author"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />
            {filteredBooks.length > 0 ? (
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                {/* Table Headers */}
                                <th>Book ID</th>
                                <th>Title</th>
                                <th>Subtitle</th>
                                <th>Statement Responsibility</th>
                                <th>Author</th>
                                <th>Subauthor</th>
                                <th>Type</th>
                                <th>AccNo</th>
                                <th>Price</th>
                                <th>Entry Date</th>
                                <th>DDC No</th>
                                <th>AUTH Mark</th>
                                <th>Section</th>
                                <th>Reference</th>
                                <th>Publisher</th>
                                <th>Place</th>
                                <th>Year</th>
                                <th>Source</th>
                                <th>Edition</th>
                                <th>Volume</th>
                                <th>Pages</th>
                                <th>Series</th>
                                <th>Language</th>
                                <th>Quantity</th>
                                <th>ISBN</th>
                                <th>Binding</th>
                                <th>Status</th>
                                <th>Remarks</th>
                                <th>Contents</th>
                                <th>Notes</th>
                                <th>Subject</th>
                                <th>Keyword</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.map((book) => (
                                <tr key={book._id}>
                                    {/* Table Data */}
                                    <td data-label="Book ID">{book.BookID}</td>
                                    <td data-label="Title">{book.Title}</td>
                                    <td data-label="Subtitle">{book.Subtitle}</td>
                                    <td data-label="Statement Responsibility">{book.StatementResponsibility}</td>
                                    <td data-label="Author">{book.Author}</td>
                                    <td data-label="Subauthor">{book.Subauthor}</td>
                                    <td data-label="Type">{book.Type}</td>
                                    <td data-label="AccNo">{book.AccNo}</td>
                                    <td data-label="Price">{book.Price}</td>
                                    <td data-label="Entry Date">{new Date(book.EntryDate).toLocaleDateString()}</td>
                                    <td data-label="DDC No">{book.DDC_No}</td>
                                    <td data-label="AUTH Mark">{book.AUTH_Mark}</td>
                                    <td data-label="Section">{book.Section}</td>
                                    <td data-label="Reference">{book.Reference ? 'Yes' : 'No'}</td>
                                    <td data-label="Publisher">{book.Publisher}</td>
                                    <td data-label="Place">{book.Place}</td>
                                    <td data-label="Year">{book.Year}</td>
                                    <td data-label="Source">{book.Source}</td>
                                    <td data-label="Edition">{book.Edition}</td>
                                    <td data-label="Volume">{book.Volume}</td>
                                    <td data-label="Pages">{book.Pages}</td>
                                    <td data-label="Series">{book.Series}</td>
                                    <td data-label="Language">{book.Language}</td>
                                    <td data-label="Quantity">{book.Quantity}</td>
                                    <td data-label="ISBN">{book.ISBN}</td>
                                    <td data-label="Binding">{book.Binding}</td>
                                    <td data-label="Status">{book.Status}</td>
                                    <td data-label="Remarks">{book.Remarks}</td>
                                    <td data-label="Contents">{book.Contents}</td>
                                    <td data-label="Notes">{book.Notes}</td>
                                    <td data-label="Subject">{book.Subject}</td>
                                    <td data-label="Keyword">{book.keyword}</td>
                                    <td data-label="Actions">
                                        <button onClick={() => handleEdit(book._id)} className="action-button edit">Edit</button>
                                        <button onClick={() => handleDelete(book._id)} className="action-button delete">Delete</button>
                                        <button onClick={() => handleBorrow(book)} className="action-button borrow">Borrow</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No books found</p>
            )}
            {selectedBook && <BorrowBook book={selectedBook} onClose={() => setSelectedBook(null)} />}
            {selectedBook && <FacaultyBorrowBook book={selectedBook} onClose={() => setSelectedBook(null)} />}

            <div className="back-button-container">
                <button onClick={() => navigate('/admin-dashboard')} className="back-button">Back</button>
            </div>

            <style jsx>{`
                .books-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                    background: lightgrey;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    height: 600px;
                    overflow: auto;
                }

                h2 {
                    text-align: center;
                    margin-bottom: 20px;
                    color: #333;
                }

                .search-bar {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 20px;
                    border: 2px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    min-width: 500px;
                }

                thead {
                    position: sticky;
                    top: 0;
                    z-index: 10;
                    background-color: #f4f4f4;
                }

                th,
                td {
                    border: 2px solid #ddd;
                    padding: 8px;
                    text-align: left;
                    min-width: 100px;
                }

                th {
                    background-color: green;
                    color: white;
                    position: sticky;
                    top: 0;
                    z-index: 3;
                }

                td:first-child,
                th:first-child {
                    position: sticky;
                    left: 0;
                    background-color: green;
                    z-index: 4;
                    color: white;
                }

                tr:nth-child(even) {
                    background-color: lightgrey;
                }

                .table-wrapper {
                    overflow-x: auto;
                }

                .action-button {
                    margin-right: 10px;
                    padding: 5px 10px;
                    border: none;
                    color: white;
                    cursor: pointer;
                    border-radius: 4px;
                }

                .edit {
                    background-color: green;
                }

                .delete {
                    background-color: red;
                }

                .borrow {
                    background-color: blue;
                }

                .action-button:hover {
                    opacity: 0.8;
                }

                p {
                    text-align: center;
                    color: #777;
                }

                .back-button-container {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 20px;
                }

                .back-button {
                    padding: 10px 20px;
                    background-color: #333;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .back-button:hover {
                    background-color: #555;
                }
            `}</style>
        </div>
    );
};

export default AllBooks;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import BorrowBook from './BorrowBook';
// import FacaultyBorrowBook from './FacaultyBorrowBook';

// const AllBooks = () => {
//     const [books, setBooks] = useState([]);
//     const [selectedBook, setSelectedBook] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchBooks = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/books');
//                 const data = await response.json();
//                 setBooks(data);
//             } catch (error) {
//                 console.error('Error fetching books:', error);
//             }
//         };

//         fetchBooks();
//     }, []);

//     const handleEdit = (id) => {
//         navigate(`/update-book/${id}`);
//     };

//     const handleDelete = async (id) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this book?");
//         if (confirmDelete) {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/books/${id}`, {
//                     method: 'DELETE',
//                 });
//                 if (response.ok) {
//                     setBooks(books.filter(book => book._id !== id));
//                     alert('Book deleted successfully');
//                 } else {
//                     alert('Failed to delete book');
//                 }
//             } catch (error) {
//                 console.error('Error deleting book:', error);
//             }
//         }
//     };

//     const handleBorrow = (book) => {
//         setSelectedBook(book);
//     };

//     return (
//         <div className="books-container">
//             <h2>All Books</h2>
//             {books.length > 0 ? (
//                 <div className="table-wrapper">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Book ID</th>
//                                 <th>Title</th>
//                                 <th>Subtitle</th>
//                                 <th>Statement Responsibility</th>
//                                 <th>Author</th>
//                                 <th>Subauthor</th>
//                                 <th>Type</th>
//                                 <th>AccNo</th>
//                                 <th>Price</th>
//                                 <th>Entry Date</th>
//                                 <th>DDC No</th>
//                                 <th>AUTH Mark</th>
//                                 <th>Section</th>
//                                 <th>Reference</th>
//                                 <th>Publisher</th>
//                                 <th>Place</th>
//                                 <th>Year</th>
//                                 <th>Source</th>
//                                 <th>Edition</th>
//                                 <th>Volume</th>
//                                 <th>Pages</th>
//                                 <th>Series</th>
//                                 <th>Language</th>
//                                 <th>Quantity</th>
//                                 <th>ISBN</th>
//                                 <th>Binding</th>
//                                 <th>Status</th>
//                                 <th>Remarks</th>
//                                 <th>Contents</th>
//                                 <th>Notes</th>
//                                 <th>Subject</th>
//                                 <th>Keyword</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {books.map((book) => (
//                                 <tr key={book._id}>
//                                     <td data-label="Book ID">{book.BookID}</td>
//                                     <td data-label="Title">{book.Title}</td>
//                                     <td data-label="Subtitle">{book.Subtitle}</td>
//                                     <td data-label="Statement Responsibility">{book.StatementResponsibility}</td>
//                                     <td data-label="Author">{book.Author}</td>
//                                     <td data-label="Subauthor">{book.Subauthor}</td>
//                                     <td data-label="Type">{book.Type}</td>
//                                     <td data-label="AccNo">{book.AccNo}</td>
//                                     <td data-label="Price">{book.Price}</td>
//                                     <td data-label="Entry Date">{new Date(book.EntryDate).toLocaleDateString()}</td>
//                                     <td data-label="DDC No">{book.DDC_No}</td>
//                                     <td data-label="AUTH Mark">{book.AUTH_Mark}</td>
//                                     <td data-label="Section">{book.Section}</td>
//                                     <td data-label="Reference">{book.Reference ? 'Yes' : 'No'}</td>
//                                     <td data-label="Publisher">{book.Publisher}</td>
//                                     <td data-label="Place">{book.Place}</td>
//                                     <td data-label="Year">{book.Year}</td>
//                                     <td data-label="Source">{book.Source}</td>
//                                     <td data-label="Edition">{book.Edition}</td>
//                                     <td data-label="Volume">{book.Volume}</td>
//                                     <td data-label="Pages">{book.Pages}</td>
//                                     <td data-label="Series">{book.Series}</td>
//                                     <td data-label="Language">{book.Language}</td>
//                                     <td data-label="Quantity">{book.Quantity}</td>
//                                     <td data-label="ISBN">{book.ISBN}</td>
//                                     <td data-label="Binding">{book.Binding}</td>
//                                     <td data-label="Status">{book.Status}</td>
//                                     <td data-label="Remarks">{book.Remarks}</td>
//                                     <td data-label="Contents">{book.Contents}</td>
//                                     <td data-label="Notes">{book.Notes}</td>
//                                     <td data-label="Subject">{book.Subject}</td>
//                                     <td data-label="Keyword">{book.keyword}</td>
//                                     <td data-label="Actions">
//                                         <button onClick={() => handleEdit(book._id)} className="action-button edit">Edit</button>
//                                         <button onClick={() => handleDelete(book._id)} className="action-button delete">Delete</button>
//                                         <button onClick={() => handleBorrow(book)} className="action-button borrow">Borrow</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <p>No books found</p>
//             )}
//             {selectedBook && <BorrowBook book={selectedBook} onClose={() => setSelectedBook(null)} />}
//             {selectedBook && <FacaultyBorrowBook book={selectedBook} onClose={() => setSelectedBook(null)} />}

//             <div className="back-button-container">
//                 <button onClick={() => navigate('/admin-dashboard')} className="back-button">Back</button>
//             </div>

//             <style jsx>{`
//                 .books-container {
//                     max-width: 1200px;
//                     margin: 0 auto;
//                     padding: 20px;
//                     background: lightgrey;
//                     border-radius: 8px;
//                     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//                     height: 600px;
//                     overflow: auto;
//                 }

//                 h2 {
//                     text-align: center;
//                     margin-bottom: 20px;
//                     color: #333;
//                 }

//                 table {
//                     width: 100%;
//                     border-collapse: collapse;
//                     min-width: 500px;
//                 }

//                 thead {
//                     position: sticky;
//                     top: 0;
//                     z-index: 10;
//                     background-color: #f4f4f4;
//                 }

//                 th,
//                 td {
//                     border: 2px solid #ddd;
//                     padding: 8px;
//                     text-align: left;
//                     min-width: 100px;
//                 }

//                 th {
//                     background-color: green;
//                     color: white;
//                     position: sticky;
//                     top: 0;
//                     z-index: 3;
//                 }

//                 td:first-child,
//                 th:first-child {
//                     position: sticky;
//                     left: 0;
//                     background-color: green;
//                     z-index: 4;
//                     color: white;
//                 }

//                 tr:nth-child(even) {
//                     background-color: lightgrey;
//                 }

//                 .table-wrapper {
//                     overflow-x: auto;
//                 }

//                 .action-button {
//                     margin-right: 10px;
//                     padding: 5px 10px;
//                     border: none;
//                     color: white;
//                     cursor: pointer;
//                     border-radius: 4px;
//                 }

//                 .edit {
//                     background-color: green;
//                 }

//                 .delete {
//                     background-color: red;
//                 }

//                 .borrow {
//                     background-color: blue;
//                 }

//                 .action-button:hover {
//                     opacity: 0.8;
//                 }

//                 p {
//                     text-align: center;
//                     color: #777;
//                 }

//                 .back-button-container {
//                     display: flex;
//                     justify-content: flex-end;
//                     margin-top: 20px;
//                 }

//                 .back-button {
//                     padding: 10px 15px;
//                     background-color: blue;
//                     color: white;
//                     border: none;
//                     border-radius: 5px;
//                     cursor: pointer;
//                 }

//                 .back-button:hover {
//                     opacity: 0.8;
//                 }

//                 /* Responsive Styling */
//                 @media (max-width: 768px) {
//                     table,
//                     thead,
//                     tbody,
//                     th,
//                     td,
//                     tr {
//                         display: block;
//                     }

//                     th {
//                         display: none; /* Hide table headers */
//                     }

//                     tr {
//                         margin-bottom: 20px;
//                     }

//                     td {
//                         position: relative;
//                         padding-left: 50%;
//                     }

//                     td::before {
//                         content: attr(data-label);
//                         position: absolute;
//                         left: 0;
//                         width: 45%;
//                         padding-left: 15px;
//                         font-weight: bold;
//                         white-space: nowrap;
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default AllBooks;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import BorrowBook from './BorrowBook';
// import FacaultyBorrowBook from './FacaultyBorrowBook';

// const AllBooks = () => {
//     const [books, setBooks] = useState([]);
//     const [selectedBook, setSelectedBook] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchBooks = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/books');
//                 const data = await response.json();
//                 setBooks(data);
//             } catch (error) {
//                 console.error('Error fetching books:', error);
//             }
//         };

//         fetchBooks();
//     }, []);

//     const handleEdit = (id) => {
//         navigate(`/update-book/${id}`);
//     };

//     const handleDelete = async (id) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this book?");
//         if (confirmDelete) {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/books/${id}`, {
//                     method: 'DELETE',
//                 });
//                 if (response.ok) {
//                     setBooks(books.filter(book => book._id !== id));
//                     alert('Book deleted successfully');
//                 } else {
//                     alert('Failed to delete book');
//                 }
//             } catch (error) {
//                 console.error('Error deleting book:', error);
//             }
//         }
//     };

//     const handleBorrow = (book) => {
//         setSelectedBook(book);
//     };

//     return (
//         <div className="books-container">
//             <h2>All Books</h2>
//             {books.length > 0 ? (
//                 <div className="table-wrapper">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Book ID</th>
//                                 <th>Title</th>
//                                 <th>Subtitle</th>
//                                 <th>Statement Responsibility</th>
//                                 <th>Author</th>
//                                 <th>Subauthor</th>
//                                 <th>Type</th>
//                                 <th>AccNo</th>
//                                 <th>Price</th>
//                                 <th>Entry Date</th>
//                                 <th>DDC No</th>
//                                 <th>AUTH Mark</th>
//                                 <th>Section</th>
//                                 <th>Reference</th>
//                                 <th>Publisher</th>
//                                 <th>Place</th>
//                                 <th>Year</th>
//                                 <th>Source</th>
//                                 <th>Edition</th>
//                                 <th>Volume</th>
//                                 <th>Pages</th>
//                                 <th>Series</th>
//                                 <th>Language</th>
//                                 <th>Quantity</th>
//                                 <th>ISBN</th>
//                                 <th>Binding</th>
//                                 <th>Status</th>
//                                 <th>Remarks</th>
//                                 <th>Contents</th>
//                                 <th>Notes</th>
//                                 <th>Subject</th>
//                                 <th>Keyword</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {books.map((book) => (
//                                 <tr key={book._id}>
//                                     <td>{book.BookID}</td>
//                                     <td>{book.Title}</td>
//                                     <td>{book.Subtitle}</td>
//                                     <td>{book.StatementResponsibility}</td>
//                                     <td>{book.Author}</td>
//                                     <td>{book.Subauthor}</td>
//                                     <td>{book.Type}</td>
//                                     <td>{book.AccNo}</td>
//                                     <td>{book.Price}</td>
//                                     <td>{new Date(book.EntryDate).toLocaleDateString()}</td>
//                                     <td>{book.DDC_No}</td>
//                                     <td>{book.AUTH_Mark}</td>
//                                     <td>{book.Section}</td>
//                                     <td>{book.Reference ? 'Yes' : 'No'}</td>
//                                     <td>{book.Publisher}</td>
//                                     <td>{book.Place}</td>
//                                     <td>{book.Year}</td>
//                                     <td>{book.Source}</td>
//                                     <td>{book.Edition}</td>
//                                     <td>{book.Volume}</td>
//                                     <td>{book.Pages}</td>
//                                     <td>{book.Series}</td>
//                                     <td>{book.Language}</td>
//                                     <td>{book.Quantity}</td>
//                                     <td>{book.ISBN}</td>
//                                     <td>{book.Binding}</td>
//                                     <td>{book.Status}</td>
//                                     <td>{book.Remarks}</td>
//                                     <td>{book.Contents}</td>
//                                     <td>{book.Notes}</td>
//                                     <td>{book.Subject}</td>
//                                     <td>{book.keyword}</td>
//                                     <td>
//                                         <button onClick={() => handleEdit(book._id)} className="action-button edit">Edit</button>
//                                         <button onClick={() => handleDelete(book._id)} className="action-button delete">Delete</button>
//                                         <button onClick={() => handleBorrow(book)} className="action-button borrow">Borrow</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <p>No books found</p>
//             )}
//             {selectedBook && <BorrowBook book={selectedBook} onClose={() => setSelectedBook(null)} />}
//             {selectedBook && <FacaultyBorrowBook book={selectedBook} onClose={() => setSelectedBook(null)} />}

//             <div className="back-button-container">
//                 <button onClick={() => navigate('/admin-dashboard')} className="back-button">Back</button>
//             </div>

//             <style jsx>{`
//                 .books-container {
//                     max-width: 1200px;
//                     margin: 0 auto;
//                     padding: 20px;
//                     background: lightgrey;
//                     border-radius: 8px;
//                     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//                     height: 600px;
//                     overflow: auto;
//                 }

//                 h2 {
//                     text-align: center;
//                     margin-bottom: 20px;
//                     color: #333;
//                 }

//                 table {
//                     width: 100%;
//                     border-collapse: collapse;
//                     min-width: 500px;
//                 }

//                 thead {
//                     position: sticky;
//                     top: 0;
//                     z-index: 10;
//                     background-color: #f4f4f4;
//                 }

//                 th,
//                 td {
//                     border: 2px solid #ddd;
//                     padding: 8px;
//                     text-align: left;
//                     min-width: 100px;
//                 }

//                 th {
//                     background-color: green;
//                     color: white;
//                     position: sticky;
//                     top: 0;
//                     z-index: 3;
//                 }

//                 td:first-child,
//                 th:first-child {
//                     position: sticky;
//                     left: 0;
//                     background-color: green;
//                     z-index: 4;
//                     color: white;
//                 }

//                 tr:nth-child(even) {
//                     background-color: lightgrey;
//                 }

//                 .table-wrapper {
//                     overflow-x: auto;
//                 }

//                 .action-button {
//                     margin-right: 10px;
//                     padding: 5px 10px;
//                     border: none;
//                     color: white;
//                     cursor: pointer;
//                     border-radius: 4px;
//                 }

//                 .edit {
//                     background-color: green;
//                 }

//                 .delete {
//                     background-color: red;
//                 }

//                 .borrow {
//                     background-color: blue;
//                 }

//                 .action-button:hover {
//                     opacity: 0.8;
//                 }

//                 p {
//                     text-align: center;
//                     color: #777;
//                 }

//                 .back-button-container {
//                     display: flex;
//                     justify-content: flex-end;
//                     margin-top: 20px;
//                 }

//                 .back-button {
//                     padding: 10px 15px;
//                     background-color: blue;
//                     color: white;
//                     border: none;
//                     border-radius: 5px;
//                     cursor: pointer;
//                 }

//                 .back-button:hover {
//                     opacity: 0.8;
//                 }

//                 /* Responsive Styling */
//                 @media (max-width: 1024px) {
//                     .books-container {
//                         padding: 15px;
//                     }

//                     table {
//                         font-size: 14px;
//                     }

//                     th,
//                     td {
//                         padding: 6px;
//                     }

//                     .action-button {
//                         padding: 5px 8px;
//                     }

//                     .back-button {
//                         padding: 8px 12px;
//                     }
//                 }

//                 @media (max-width: 768px) {
//                     table,
//                     thead,
//                     tbody,
//                     th,
//                     td,
//                     tr {
//                         display: block;
//                     }

//                     th {
//                         display: none; /* Hide table headers */
//                     }

//                     tr {
//                         margin-bottom: 20px;
//                     }

//                     td {
//                         position: relative;
//                         padding-left: 50%;
//                     }

//                     td::before {
//                         content: attr(data-label);
//                         position: absolute;
//                         left: 0;
//                         width: 45%;
//                         padding-left: 10px;
//                         font-weight: bold;
//                         white-space: nowrap;
//                     }

//                     .action-button {
//                         margin: 5px 0;
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default AllBooks;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import BorrowBook from './BorrowBook';
// import FacaultyBorrowBook from './FacaultyBorrowBook';

// const AllBooks = () => {
//     const [books, setBooks] = useState([]);
//     const [selectedBook, setSelectedBook] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchBooks = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/books');
//                 const data = await response.json();
//                 setBooks(data);
//             } catch (error) {
//                 console.error('Error fetching books:', error);
//             }
//         };

//         fetchBooks();
//     }, []);

//     const handleEdit = (id) => {
//         navigate(`/update-book/${id}`);
//     };

//     const handleDelete = async (id) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this book?");
//         if (confirmDelete) {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/books/${id}`, {
//                     method: 'DELETE',
//                 });
//                 if (response.ok) {
//                     setBooks(books.filter(book => book._id !== id));
//                     alert('Book deleted successfully');
//                 } else {
//                     alert('Failed to delete book');
//                 }
//             } catch (error) {
//                 console.error('Error deleting book:', error);
//             }
//         }
//     };

//     const handleBorrow = (book) => {
//         setSelectedBook(book);
//     };

//     return (
//         <div className="books-container">
//             <h2>All Books</h2>
//             {books.length > 0 ? (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Book ID</th>
//                             <th>Title</th>
//                             <th>Subtitle</th>
//                             <th>Statement Responsibility</th>
//                             <th>Author</th>
//                             <th>Subauthor</th>
//                             <th>Type</th>
//                             <th>AccNo</th>
//                             <th>Price</th>
//                             <th>Entry Date</th>
//                             <th>DDC No</th>
//                             <th>AUTH Mark</th>
//                             <th>Section</th>
//                             <th>Reference</th>
//                             <th>Publisher</th>
//                             <th>Place</th>
//                             <th>Year</th>
//                             <th>Source</th>
//                             <th>Edition</th>
//                             <th>Volume</th>
//                             <th>Pages</th>
//                             <th>Series</th>
//                             <th>Language</th>
//                             <th>Quantity</th>
//                             <th>ISBN</th>
//                             <th>Binding</th>
//                             <th>Status</th>
//                             <th>Remarks</th>
//                             <th>Contents</th>
//                             <th>Notes</th>
//                             <th>Subject</th>
//                             <th>Keyword</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {books.map((book) => (
//                             <tr key={book._id}>
//                                 <td>{book.BookID}</td>
//                                 <td>{book.Title}</td>
//                                 <td>{book.Subtitle}</td>
//                                 <td>{book.StatementResponsibility}</td>
//                                 <td>{book.Author}</td>
//                                 <td>{book.Subauthor}</td>
//                                 <td>{book.Type}</td>
//                                 <td>{book.AccNo}</td>
//                                 <td>{book.Price}</td>
//                                 <td>{new Date(book.EntryDate).toLocaleDateString()}</td>
//                                 <td>{book.DDC_No}</td>
//                                 <td>{book.AUTH_Mark}</td>
//                                 <td>{book.Section}</td>
//                                 <td>{book.Reference ? 'Yes' : 'No'}</td>
//                                 <td>{book.Publisher}</td>
//                                 <td>{book.Place}</td>
//                                 <td>{book.Year}</td>
//                                 <td>{book.Source}</td>
//                                 <td>{book.Edition}</td>
//                                 <td>{book.Volume}</td>
//                                 <td>{book.Pages}</td>
//                                 <td>{book.Series}</td>
//                                 <td>{book.Language}</td>
//                                 <td>{book.Quantity}</td>
//                                 <td>{book.ISBN}</td>
//                                 <td>{book.Binding}</td>
//                                 <td>{book.Status}</td>
//                                 <td>{book.Remarks}</td>
//                                 <td>{book.Contents}</td>
//                                 <td>{book.Notes}</td>
//                                 <td>{book.Subject}</td>
//                                 <td>{book.keyword}</td>
//                                 <td>
//                                     <button onClick={() => handleEdit(book._id)} className="action-button edit">Edit</button>
//                                     <button onClick={() => handleDelete(book._id)} className="action-button delete">Delete</button>
//                                     <button onClick={() => handleBorrow(book)} className="action-button borrow">Borrow</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <p>No books found</p>
//             )}
//             {selectedBook && <BorrowBook book={selectedBook} onClose={() => setSelectedBook(null)} />}
//             {selectedBook && <FacaultyBorrowBook book={selectedBook} onClose={() => setSelectedBook(null)} />}

//             {/* Back button below the table */}
//             <div className="back-button-container">
//                 <button onClick={() => navigate('/admin-dashboard')} className="back-button">Back</button>
//             </div>

//             <style jsx>{`
//                 .books-container {
//                     max-width: 1200px;
//                     margin: 0 auto;
//                     padding: 20px;
//                     background: lightgrey;
//                     border-radius: 8px;
//                     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//                     height: 600px;
//                     overflow: auto;
//                 }

//                 h2 {
//                     text-align: center;
//                     margin-bottom: 20px;
//                     color: #333;
//                 }

//                 table {
//                     width: 100%;
//                     border-collapse: collapse;
//                     min-width: 500px;
//                 }

//                 thead {
//                     position: sticky;
//                     top: 0;
//                     z-index: 10;
//                     background-color: #f4f4f4;
//                 }

//                 th,
//                 td {
//                     border: 2px solid #ddd;
//                     padding: 8px;
//                     text-align: left;
//                     min-width: 100px;
//                 }

//                 th {
//                     background-color: green;
//                     color: white;
//                     position: sticky;
//                     top: 0;
//                     z-index: 3;
//                 }

//                 td:first-child,
//                 th:first-child {
//                     position: sticky;
//                     left: 0;
//                     background-color: green;
//                     z-index: 4;
//                     color: white;
//                 }

//                 tr:nth-child(even) {
//                     background-color: lightgrey;
//                 }

//                 .books-container {
//                     overflow-x: auto;
//                     white-space: nowrap;
//                 }

//                 .action-button {
//                     margin-right: 10px;
//                     padding: 5px 10px;
//                     border: none;
//                     color: white;
//                     cursor: pointer;
//                     border-radius: 4px;
//                 }

//                 .edit {
//                     background-color: green;
//                 }

//                 .delete {
//                     background-color: red;
//                 }

//                 .action-button:hover {
//                     opacity: 0.8;
//                 }

//                 p {
//                     text-align: center;
//                     color: #777;
//                 }

//                 .back-button-container {
//                     display: flex;
//                     justify-content: flex-end;
//                     margin-top: 20px;
//                 }

//                 .back-button {
//                     padding: 10px 15px;
//                     background-color: blue;
//                     color: white;
//                     border: none;
//                     border-radius: 5px;
//                     cursor: pointer;
//                 }

//                 .back-button:hover {
//                     opacity: 0.8;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default AllBooks;
