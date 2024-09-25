import React from 'react';
import { Link } from 'react-router-dom';

function TeacherDashboard() {
  return (
    <div className="dashboard-container">
        <h1>Teacher Dashboard</h1>
        <ul className="dashboard-menu">
            <li><Link to="/teacher/books">Book List</Link></li>
            <li><Link to="/api/borrowed">Borrow Book</Link></li>
            
        </ul>
        <style jsx>{`
          .dashboard-container {
              text-align: center;
              padding: 20px;
              background-color: #f4f4f4;
              border-radius: 10px;
              max-width: 600px;
              margin: 20px auto;
              box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          
          h1 {
              color: #333;
              margin-bottom: 20px;
          
          .dashboard-menu {
              list-style-type: none;
              padding: 0;
          
          .dashboard-menu li {
              margin: 10px 0;
          
          .dashboard-menu a {
              text-decoration: none;
              padding: 10px 15px;
              color: #fff;
              background-color: #007bff;
              border-radius: 5px;
              display: inline-block;
              transition: background-color 0.3s ease;
          
          .dashboard-menu a:hover {
              background-color: #0056b3;
          }
      `}</style>
    </div>
  );
};

export default TeacherDashboard
