// src/App.js
import React, { useState, useEffect } from 'react';
import ContentViewer from './Components/ContentViewer';

function App() {
  const [message, setMessage] = useState("");
  const [controllerWs, setControllerWs] = useState(null);
  const [remoteContent, setRemoteContent] = useState("");

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8081');

    ws.onopen = () => {
      console.log('Connected to Controller server');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      switch(data.method){
        case "content":
          setRemoteContent(data.data); // Ensure data.data is a string
          break;
        case "norooom":
          console.log("No Room found");
          break;
        default:
          break;
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from Controller server');
    };

    setControllerWs(ws);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>{message}</h1>
      {controllerWs && <ContentViewer content={remoteContent} ws={controllerWs} />}
    </div>
  );
}

export default App;
