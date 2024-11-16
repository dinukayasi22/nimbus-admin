import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('adminToken');
            try {
                const response = await axios.get('http://localhost:5000/api/bookings', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBookings(response.data);
            } catch (error) {
                setError('Error fetching bookings. Please try again later.');
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) {
        return <div>Loading bookings...</div>;
    }

    return (
        <div>
            <h2>View Bookings</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Passport Number</th>
                        <th>Booking Number</th>
                        <th>Class Type</th>
                        <th>Flight Type</th>
                        <th>Departure Date</th>
                        <th>{/* Conditional Header */} Arrival Date</th>
                        <th>Flight</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking._id}>
                            <td>{booking.user?.firstName} {booking.user?.lastName}</td>
                            <td>{booking.user?.passportNumber}</td>
                            <td>{booking.bookingNumber}</td>
                            <td>{booking.classType}</td>
                            <td>{booking.flight?.flightType}</td>
                            <td>{new Date(booking.flight?.departDate).toLocaleString()}</td>
                            <td>
                                {/* Conditionally render Arrival Date */}
                                {booking.flight?.flightType === 'One Way' ? '-' : new Date(booking.flight?.returnDate).toLocaleString()}
                            </td>
                            <td>{booking.flight?.from} to {booking.flight?.to}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewBookings;