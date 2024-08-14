// src/ContentViewer.js
import React from 'react';
import ParsedContent from './ParsedContent';
import OpenInterface from './OpenInterface';

const ContentViewer = ({ content, ws }) => {
    

    let data = {
        method: 'playSend',
        data: {
          button: '0',
          values: ["","","","",""]
        },
      };

    const handleButtonClick = (param) => {
        data.data.button = param;
        console.log('Button clicked with param:', param);
        ws.send(JSON.stringify(data));
        data.data.values= ["","","","",""];
    };

    const handleTextChange = (value, param) => {
        console.log('Text input changed:', value, 'with param:', param);
        data.data.values[parseInt(param)] = value;
    };

    return (
        <>
            <ParsedContent 
                htmlString={content} 
                handleButtonClick={handleButtonClick} 
                handleTextChange={handleTextChange} 
            />
            {ws && content === "" && <OpenInterface ws={ws} />}
        </>
    );
};

export default ContentViewer;
