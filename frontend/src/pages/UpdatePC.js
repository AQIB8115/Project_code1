
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdatePC = () => {
    const [pc, setPc] = useState({
        PcID: '',
        location: '',
        status: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPC = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/pcs/${id}`);
                setPc(response.data);
            } catch (error) {
                console.error('Error fetching PC:', error);
            }
        };
        fetchPC();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPc(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/pcs/${id}`, pc);
            navigate('/list-pc');
        } catch (error) {
            console.error('Error updating PC:', error);
        }
    };

    return (
        <div>
            <h2>Update PC</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="PcID">PCID:</label>
                    <input
                        type="text"
                        id="PcID"
                        name="PcID"
                        value={pc.PcID}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={pc.location}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="status">Status:</label>
                    <input
                        type="text"
                        id="status"
                        name="status"
                        value={pc.status}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdatePC;