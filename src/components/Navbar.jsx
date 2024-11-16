import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken'); // Clear the token from local storage
        navigate('/'); // Redirect to the login page
    };

    return (
        <nav>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/manage-users">Manage Users</Link></li>
                <li><Link to="/manage-flights">Manage Flights</Link></li>
                <li><Link to="/view-feedback">View Feedback</Link></li>
                <li><Link to="/view-bookings">View Bookings</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;