
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeletePc = () => {
    const { id } = useParams();
    const [pc, setPc] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPc = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/pcs/${id}`);
                const data = await response.json();
                setPc(data);
            } catch (error) {
                console.error('Error fetching PC:', error);
            }
        };

        fetchPc();
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/pcs/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('PC deleted successfully');
                navigate('/admin/list-pc');
            } else {
                alert('Failed to delete PC');
            }
        } catch (error) {
            console.error('Error deleting PC:', error);
        }
    };

    if (!pc) return <p>Loading...</p>;

    return (
        <div>
            <h2>Delete PC</h2>
            <p>Are you sure you want to delete "{pc.location}" by {pc.status}?</p>
            <button onClick={handleDelete}>Yes,<br></br> Delete</button><br></br>
            <button onClick={() => navigate('/admin/list-pc')}>No, <br></br>Go Back</button>
        </div>
    );
};

export default DeletePc;