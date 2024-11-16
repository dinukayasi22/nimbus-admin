import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageFlights = () => {
    const [flights, setFlights] = useState([]);
    const [newFlight, setNewFlight] = useState({
        from: '',
        to: '',
        departDate: '',
        returnDate: '',
        flightType: 'Return', // Default to Return
        firstClassPrice: '',
        businessClassPrice: '',
        economyClassPrice: '',
        availableSeats: 120,
        firstClassSeats: 20,
        businessClassSeats: 30,
        economyClassSeats: 70
    });

    useEffect(() => {
        const fetchFlights = async () => {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get('http://localhost:5000/api/admin/flights', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFlights(response.data);
        };
        fetchFlights();
    }, []);

    const handleAddFlight = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
    
        // Log the newFlight object to check if flightType is set
        console.log('New Flight Data:', newFlight);
    
        // Ensure all required fields are filled
        if (!newFlight.from || !newFlight.to || !newFlight.departDate || !newFlight.firstClassPrice || !newFlight.businessClassPrice || !newFlight.economyClassPrice || !newFlight.flightType) {
            alert('Please fill in all required fields.');
            return;
        }
    
        // Check if flightType is "Return" and returnDate is provided
        if (newFlight.flightType === 'Return' && !newFlight.returnDate) {
            alert('Please provide a return date for return flights.');
            return;
        }
    
        // Convert prices to numbers
        const flightData = {
            ...newFlight,
            firstClassPrice: Number(newFlight.firstClassPrice),
            businessClassPrice: Number(newFlight.businessClassPrice),
            economyClassPrice: Number(newFlight.economyClassPrice),
            availableSeats: newFlight.firstClassSeats + newFlight.businessClassSeats + newFlight.economyClassSeats // Total available seats
        };
    
        // Log the flightData to ensure it has all required fields
        console.log('Flight Data to be sent:', flightData);
    
        try {
            const response = await axios.post('http://localhost:5000/api/admin/flights', flightData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFlights([...flights, response.data]); // Add the newly created flight to the state
            // Reset the form fields
            setNewFlight({
                from: '',
                to: '',
                departDate: '',
                returnDate: '',
                flightType: 'Return', // Reset to default
                firstClassPrice: '',
                businessClassPrice: '',
                economyClassPrice: '',
                availableSeats: 120,
                firstClassSeats: 20,
                businessClassSeats: 30,
                economyClassSeats: 70
            });
        } catch (error) {
            console.error('Error adding flight:', error);
            alert('Error adding flight. Please check the console for details.');
        }
    };

    const handleDeleteFlight = async (id) => {
        const token = localStorage.getItem('adminToken');
        try {
            await axios.delete(`http://localhost:5000/api/admin/flights/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFlights(flights.filter(flight => flight._id !== id)); // Remove the deleted flight from the state
            alert('Flight deleted successfully!'); // Alert for successful deletion
        } catch (error) {
            console.error('Error deleting flight:', error);
            alert('Error deleting flight. Please try again.'); // Alert for error
        }
    };

    return (
        <div>
            <h2>Manage Flights</h2>
            <form onSubmit={handleAddFlight}>
                <input type="text" placeholder="From" value={newFlight.from} onChange={(e) => setNewFlight({ ...newFlight, from: e.target.value })} required />
                <input type="text" placeholder="To" value={newFlight.to} onChange={(e) => setNewFlight({ ...newFlight, to: e.target.value })} required />
                <input type="datetime-local" placeholder="Depart Date" value={newFlight.departDate} onChange={(e) => setNewFlight({ ...newFlight, departDate: e.target.value })} required />
                
                {/* Conditionally render the return date input */}
                {newFlight.flightType === 'Return' && (
    <input type="datetime-local" placeholder="Return Date" value={newFlight.returnDate} onChange={(e) => setNewFlight({ ...newFlight, returnDate: e.target.value })} />
)}
                
                <select value={newFlight.flightType} onChange={(e) => setNewFlight({ ...newFlight, flightType: e.target.value })}>
                    <option value="Return">Return</option>
                    <option value="One Way">One Way</option>
                </select>
                <input type="number" placeholder="First Class Price" value={newFlight.firstClassPrice} onChange={(e) => setNewFlight({ ...newFlight, firstClassPrice: e.target.value })} required />
                <input type="number" placeholder="Business Class Price" value={newFlight.businessClassPrice} onChange={(e) => setNewFlight({ ...newFlight, businessClassPrice: e.target.value })} required />
                <input type="number" placeholder="Economy Class Price" value={newFlight.economyClassPrice} onChange={(e) => setNewFlight({ ...newFlight, economyClassPrice: e.target.value })} required />
                <button type="submit">Add Flight</button>
            </form>
            <ul>
                {flights.map(flight => (
                    <li key={flight._id}>
                        {flight.from} to {flight.to} - Type: {flight.flightType} - First Class Price: {flight.firstClassPrice} - Business Class Price: {flight.businessClassPrice} - Economy Class Price: {flight.economyClassPrice}
                        <button onClick={() => handleDeleteFlight(flight._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageFlights;