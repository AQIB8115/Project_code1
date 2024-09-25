import React, { useState } from 'react';
import axios from 'axios';

const CreatePC = () => {
    const [form, setForm] = useState({ PcID: '', location: '', status: '' });

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/pcs', form);
            alert('PC created successfully');
            setForm({ PcID: '', location: '', status: '' }); // Reset form
        } catch (error) {
            console.error('Error creating PC:', error);
        }
    };

    return (
        <div>
            <h2>Create a New PC</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" 
                name="PcID" 
                placeholder="PC ID" 
                value={form.PcID} 
                onChange={handleInputChange} 
                required 
                />
                <input type="number" 
                name="location" 
                placeholder="Location" 
                value={form.location} 
                onChange={handleInputChange} 
                required 
                />
                <input type="text" 
                name="status" 
                placeholder="Status" 
                value={form.status} 
                onChange={handleInputChange} 
                required 
                />
                <button type="submit">Create PC</button>
            </form>
        </div>
    );
};

export default CreatePC;