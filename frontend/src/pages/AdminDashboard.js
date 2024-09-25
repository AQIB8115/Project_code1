
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate to enable navigation

    return (
        <div className="dashboard-container">
            <h1>Admin Dashboard</h1>
            <div className="button-container">
                <button onClick={() => setActiveSection('books')}>Books</button>
                <button onClick={() => setActiveSection('pcs')}>PCs</button>
                <button onClick={() => setActiveSection('users')}>Account Details</button>
                <button onClick={() => navigate(-1)} className="back-button">Back</button> {/* Back Button */}
            </div>

            {/* Conditional rendering based on active section */}
            {activeSection === 'books' && (
                <ul className="dashboard-menu">
                    <li><Link to="/admin/create-book">Create Book</Link></li>
                    <li><Link to="/admin/all-books">View All Books</Link></li>
                    <li><Link to="/update-book">Update Book</Link></li>
                    <li><Link to="/admin/delete-book">Delete Book</Link></li>
                    <li><Link to="/borrow">Borrow</Link></li>
                    <li><Link to="/borrowed-books">Borrowed List</Link></li>
                    <li><Link to="/facaultyborrowed-books">Facaulty Borrowed List</Link></li>
                </ul>
            )}

            {activeSection === 'pcs' && (
                <ul className="dashboard-menu">
                    <li><Link to="/admin/create-pc">Create PC</Link></li>
                    <li><Link to="/admin/list-pc">List PC</Link></li>
                    <li><Link to="/admin/update-pc/:id">Update PC</Link></li>
                    <li><Link to="/admin/delete-pc/:id">Delete PC</Link></li>
                </ul>
            )}

            {activeSection === 'users' && (
                <ul className="dashboard-menu">
                    <li><Link to="/admin/user">User List</Link></li>
                    <li><Link to="/admin/teacher">Teacher List</Link></li>
                </ul>
            )}

            <style jsx>{`
                .dashboard-container {
                    text-align: center;
                    padding: 20px;
                    background-color: #f4f4f4;
                    border-radius: 10px;
                    max-width: 600px;
                    margin: 20px auto;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                }

                h1 {
                    color: #333;
                    margin-bottom: 20px;
                }

                .button-container {
                    margin-bottom: 20px;
                }

                .button-container button {
                    margin: 5px;
                    padding: 10px 20px;
                    font-size: 16px;
                    color: #fff;
                    background-color: #007bff;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .button-container button:hover {
                    background-color: #0056b3;
                }

                .dashboard-menu {
                    list-style-type: none;
                    padding: 0;
                }

                .dashboard-menu li {
                    margin: 10px 0;
                }

                .dashboard-menu a {
                    text-decoration: none;
                    padding: 10px 15px;
                    color: #fff;
                    background-color: #007bff;
                    border-radius: 5px;
                    display: inline-block;
                    transition: background-color 0.3s ease;
                }

                .dashboard-menu a:hover {
                    background-color: #0056b3;
                }

                .back-button {
                    background-color: #6c757d;
                }

                .back-button:hover {
                    background-color: #5a6268;
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;