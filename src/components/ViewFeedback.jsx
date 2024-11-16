import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            const token = localStorage.getItem('adminToken');
            try {
                const response = await axios.get('http://localhost:5000/api/feedback');
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };
        fetchFeedbacks();
    }, []);

    return (
        <div>
            <h2>View Feedback</h2>
            <ul>
                {feedbacks.map(feedback => (
                    <li key={feedback._id}>
                        <strong>{feedback.title}</strong>: {feedback.message} (Rating: {feedback.rating})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewFeedback;