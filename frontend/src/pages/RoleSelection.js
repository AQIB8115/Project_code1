import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleRoleSelection = () => {
        if (role === 'admin') {
            navigate('/Adminlogin');
            // navigate('/admin-dashboard');
        } else if (role === 'teacher') {
            navigate('/TeacherSignup');
            // navigate('/teacher-dashboard');
        } else if (role === 'student') {
            navigate('/Signup');
            // navigate('/student-dashboard');
        }
    };

    return (
        <div>
            <h2>Select Your Role</h2>
            <select value={role} onChange={handleRoleChange}>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
            </select>
            <button onClick={handleRoleSelection}>Submit</button>
        </div>
    );
};

export default RoleSelection;