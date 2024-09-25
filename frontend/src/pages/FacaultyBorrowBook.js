
import React, { useState } from 'react';

const FacaultyBorrowBook = ({ book }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  const handleFacaultyBorrow = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/borrowed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          phone,
          BookID: book.BookID,
          Title: book.Title,
          AccNo: book.AccNo,
        }),
      });

      if (response.ok) {
        alert('Book borrowed successfully');
        setEmail('');
        setUsername('');
        setPhone('');
      } else {
        alert('Failed to borrow book');
      }
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Borrow {book.Title}</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      /><br></br><br></br>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      /><br></br>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
      />
      <button onClick={handleFacaultyBorrow}>Borrow</button>
    </div>
  );
};

export default FacaultyBorrowBook;