import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ManageUsers from './components/ManageUsers';
import ManageFlights from './components/ManageFlights';
import ViewFeedback from './components/ViewFeedback';
import ViewBookings from './components/ViewBookings';

const App = () => {
    const isAuthenticated = !!localStorage.getItem('adminToken'); // Check if the admin is logged in

    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route path="/dashboard" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/" />} />
                <Route path="/manage-users" element={isAuthenticated ? <ManageUsers /> : <Navigate to="/" />} />
                <Route path="/manage-flights" element={isAuthenticated ? <ManageFlights /> : <Navigate to="/" />} />
                <Route path="/view-feedback" element={isAuthenticated ? <ViewFeedback /> : <Navigate to="/" />} />
                <Route path="/view-bookings" element={isAuthenticated ? <ViewBookings /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;