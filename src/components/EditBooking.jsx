import React, { useState } from 'react';
import axios from 'axios';

const EditBooking = ({ booking, onClose }) => {
    const [passengers, setPassengers] = useState(booking.passengers);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        try {
            await axios.put(`http://localhost:5000/api/admin/bookings/${booking._id}`, { passengers }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onClose(); // Close the edit form after updating
            window.location.reload(); // Reload the bookings list to reflect changes
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    return (
        <div>
            <h2>Edit Booking</h2>
            <form onSubmit={handleUpdate}>
                <label>
                    Passengers:
                    <input
                        type="number"
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Update Booking</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default EditBooking;