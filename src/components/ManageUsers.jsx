import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('adminToken');
            try {
                const response = await axios.get('http://localhost:5000/api/admin/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(response.data);
            } catch (err) {
                setError('Error fetching users. Please try again later.');
                console.error('Error fetching users:', err);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('adminToken');
        const confirmDelete = window.confirm('Are you sure you want to delete this user?'); // Confirmation dialog
        if (!confirmDelete) return; // Exit if the user cancels

        try {
            await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(user => user._id !== id));
        } catch (err) {
            setError('Error deleting user. Please try again later.');
            console.error('Error deleting user:', err);
        }
    };

    if (loading) {
        return <div>Loading users...</div>; // Loading message
    }

    return (
        <div>
            <h2>Manage Users</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Passport No</th>
                        <th>Mobile No</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.passportNumber}</td>
                            <td>{user.mobileNumber}</td>
                            <td>
                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;