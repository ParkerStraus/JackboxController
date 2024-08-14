import React, { useState, useEffect } from 'react';

const JSONViewer = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>JSON Viewer</h1>
      {jsonData && (
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      )}
    </div>
  );
};

export default JSONViewer;
