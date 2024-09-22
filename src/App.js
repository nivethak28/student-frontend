import React, { useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');
  

  const apiEndpoint = 'https://api-students.netlify.app/bfhl'; 

  const handleJsonInput = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      setError('');
      const response = await axios.post(apiEndpoint, parsedJson);
      setResponseData(response.data);
    } catch (err) {
      setError('Invalid JSON format or API error');
    }
  };

  const handleDropdownChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedOptions(options);
  };

  const renderFilteredData = () => {
    if (!responseData) return null;

    const filteredData = {};
    if (selectedOptions.includes('Alphabets')) {
      filteredData.alphabets = responseData.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      filteredData.numbers = responseData.numbers;
    }
    if (selectedOptions.includes('Highest Lowercase Alphabet')) {
      filteredData.highestLowercaseAlphabet = responseData.highest_lowercase_alphabet;
    }
   //Replace title with rollno
    //useEffect(() => {
      //document.title = 'SRM135'; 
    //}, []);

    return (
      <div>
        <h3>Filtered Response:</h3>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Student Application</h1>
      <textarea
        placeholder="Enter JSON here"
        value={jsonInput}
        onChange={handleJsonInput}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {responseData && (
        <>
          <select multiple onChange={handleDropdownChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
          </select>
          {renderFilteredData()}
        </>
      )}
    </div>
  );
}

export default App;