import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const AdminDashboard = () => {
    return (
        <div>
            <Navbar />
            <h2>Admin Dashboard</h2>
            <p>Welcome to the admin panel!</p>
        </div>
    );
};

export default AdminDashboard;