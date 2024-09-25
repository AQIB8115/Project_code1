
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListPC = () => {
    const [pcs, setPcs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPCs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/pcs');
                console.log('Fetched PCs:', response.data);
                setPcs(response.data);
            } catch (error) {
                console.error('Error fetching PCs:', error);
                setError('Failed to fetch PCs');
            }
        };
        fetchPCs();
    }, []);

    return (
        <div>
            <h2>List of PCs</h2>
            {error && <p>{error}</p>}
            <table border="2" style={{ width: '100%', borderCollapse: 'collapse',  }}>
                <thead>
                    <tr>
                        <th>PCID</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pcs.length > 0 ? (
                        pcs.map((pc) => (
                            <tr key={pc._id}>
                                <td>{pc.PcID}</td>
                                <td>{pc.location}</td>
                                <td>{pc.status}</td>
                                <td>
                                    <Link to={`/update-pc/${pc._id}`} style={{ marginRight: '10px' }}>Edit</Link>
                                    <Link to={`/delete-pc/${pc._id}`}>Delete</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>No PCs found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListPC;
