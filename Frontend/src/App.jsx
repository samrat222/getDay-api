import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [date, setDate] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/getDay?date=${date}`);
      console.log(response.data);
      setDayOfWeek(response.data.dayOfWeek);
      setError('');
    } catch (err) {
      setDayOfWeek('');
      setError('Error fetching data. Please check the date format and try again.');
    }
  };

  return (
    <div>
      <h1>Get Day of the Week</h1>
      <div>
        <label>Date (DD/MM/YYYY): </label>
        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
        <button style={{ margin: "10px" }} onClick={handleSubmit}>Get Day</button>
      </div>
      {dayOfWeek && <p>Day of the Week is: {dayOfWeek}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default App;
