// src/App.js
import React, { useState, useEffect } from 'react';
import ContentViewer from './Components/ContentViewer';

function App() {
  const [message, setMessage] = useState("");
  const [controllerWs, setControllerWs] = useState(null);
  const [remoteContent, setRemoteContent] = useState("");

  useEffect(() => {
    const ws = new WebSocket('ws://54.67.79.113:8081');

    ws.onopen = () => {
      console.log('Connected to Controller server');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(data);
        switch (data.method) {
          case "content":
            setRemoteContent(data.data); // Ensure data.data is a string
            break;
          case "norooom":
            console.log("No Room found");
            break;
          default:
            console.log("Unknown method:", data.method);
            break;
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
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
