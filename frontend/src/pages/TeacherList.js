
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherList = () => {
    const [teachers, setTeachers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/teacher/view');
            setTeachers(response.data);
        } catch (error) {
            console.error('Error fetching teachers', error);
        }
    };

    const deleteTeacher = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/teacher/view/${id}`);
            setTeachers(teachers.filter(teacher => teacher._id !== id));
        } catch (error) {
            console.error('Error deleting teacher', error);
        }
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    };

    const thTdStyle = {
        border: '1px solid black',
        padding: '10px',
        textAlign: 'left',
    };

    const headerStyle = {
        backgroundColor: '#f2f2f2',
        fontWeight: 'bold',
    };

    const buttonStyle = {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        cursor: 'pointer',
        marginBottom: '15px',
    };

    const deleteButtonStyle = {
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
    };

    const handleAddTeacher = () => {
        navigate('/add-teacher');
    };

    return (
        <div>
        <h1>Teacher List</h1>
        <button style={buttonStyle} onClick={handleAddTeacher}>Add Teacher</button>
        <table style={tableStyle}>
            <thead>
                <tr>
                <th style={{ ...thTdStyle, ...headerStyle }}>Username</th>
                <th style={{ ...thTdStyle, ...headerStyle }}>Phone</th>
                <th style={{ ...thTdStyle, ...headerStyle }}>Email</th>
                <th style={{ ...thTdStyle, ...headerStyle }}>Actions</th>
                </tr>
            </thead>
            <tbody>
            {teachers.map(teacher => (
                <tr key={teacher._id}>
                <td style={thTdStyle}>{teacher.username}</td>
                <td style={thTdStyle}>{teacher.phone}</td>
                <td style={thTdStyle}>{teacher.email}</td>
                <td style={thTdStyle}>
                <button style={deleteButtonStyle} onClick={() => deleteTeacher(teacher._id)}>
                    Delete
                </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default TeacherList;