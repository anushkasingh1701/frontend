import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post('https://backend.herokuapp.com/bfhl', parsedInput); // Update with your backend URL
      setResponse(res.data);
    } catch (error) {
      alert('Invalid JSON input');
    }
  };

  const filteredResponse = () => {
    if (!response) return null;
    const result = {};
    if (filter.includes('Numbers')) result.numbers = response.numbers;
    if (filter.includes('Alphabets')) result.alphabets = response.alphabets;
    if (filter.includes('Highest lowercase alphabet'))
      result.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    return result;
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Data Processor</h1>
      
      {/* JSON Input Section */}
      <div className="card shadow-sm p-4 mb-4">
        <h4 className="card-title">Enter JSON Data</h4>
        <textarea
          className="form-control mb-3"
          rows="5"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON here (e.g., { "data": ["A", "1", "b"] })'
        />
        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {/* Filter and Response Section */}
      {response && (
        <div className="card shadow-sm p-4">
          <h4 className="card-title">Filter Options</h4>
          <select
            className="form-select mb-3"
            multiple
            onChange={(e) =>
              setFilter(Array.from(e.target.selectedOptions, (option) => option.value))
            }
          >
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest lowercase alphabet">Highest Lowercase Alphabet</option>
          </select>

          <h4 className="card-title">Response</h4>
          <pre className="bg-light p-3 border rounded">{JSON.stringify(filteredResponse(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
