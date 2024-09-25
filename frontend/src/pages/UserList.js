import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/user/view');
            setUsers(response.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching users', error);
            setMessage('Error fetching users. Please try again.');
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/user/view/${id}`);
            setUsers(users.filter(user => user._id !== id));
            setMessage('User deleted successfully!');
        } catch (error) {
            console.error('Error deleting user', error);
            setMessage('Error deleting user. Please try again.');
        }
    };

    const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '20px' };
    const thTdStyle = { border: '1px solid black', padding: '10px', textAlign: 'left' };
    const headerStyle = { backgroundColor: '#f2f2f2', fontWeight: 'bold' };
    const buttonStyle = { backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' };

    return (
        <div>
            <h1>
                User List 
                <button onClick={() => navigate('/add-user')} style={{ marginLeft: '20px', padding: '5px 10px' }}>Add User</button>
            </h1>
            {message && <p>{message}</p>} 
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={{ ...thTdStyle, ...headerStyle }}>Username</th>
                        <th style={{ ...thTdStyle, ...headerStyle }}>Department</th>
                        <th style={{ ...thTdStyle, ...headerStyle }}>Phone</th>
                        <th style={{ ...thTdStyle, ...headerStyle }}>Student ID</th>
                        <th style={{ ...thTdStyle, ...headerStyle }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map(user => (
                            <tr key={user._id}>
                                <td style={thTdStyle}>{user.username}</td>
                                <td style={thTdStyle}>{user.department}</td>
                                <td style={thTdStyle}>{user.phone}</td>
                                <td style={thTdStyle}>{user.studentID}</td>
                                <td style={thTdStyle}>
                                    <button style={buttonStyle} onClick={() => deleteUser(user._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={thTdStyle}>No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
