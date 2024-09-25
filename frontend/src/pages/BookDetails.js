
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
    const { AccNo } = useParams();
    const location = useLocation();
    const [book, setBook] = useState({
        Title: 'Unknown',
        AccNo: 'Unknown',
        Author: 'Unknown',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookDetails = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/book/${AccNo}`);
            if (response.data) {
                setBook(response.data);
            } else {
                console.warn('No data found for this AccNo');
                setError('No data found');
            }
        } catch (error) {
            console.error('Error fetching book details:', error);
            setError('Error fetching book details');
        } finally {
            setLoading(false);
        }
    }, [AccNo]);

    useEffect(() => {
        if (location.state) {
            setBook({
                Title: location.state.Title || 'Unknown',
                AccNo: location.state.AccNo || 'Unknown',
                Author: location.state.Author || 'Unknown',
            });
            setLoading(false);
        } else {
            fetchBookDetails();
        }
    }, [fetchBookDetails, location.state]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="details-container">
            <h2>Book Details</h2>
            <p><strong>Title:</strong> {book.Title}</p>
            <p><strong>AccNo:</strong> {book.AccNo}</p>
            <p><strong>Author:</strong> {book.Author}</p>

            <style jsx>{`
                .details-container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background: #f9f9f9;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                h2 {
                    text-align: center;
                    margin-bottom: 20px;
                    color: #333;
                }

                p {
                    font-size: 18px;
                    margin-bottom: 10px;
                }
            `}</style>
        </div>
    );
};

export default BookDetails;