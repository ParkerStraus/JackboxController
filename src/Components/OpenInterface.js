//import React, { useState, useEffect } from 'react';
//lsdkj
const OpenInterface = (props) => {
  console.log(props);
  
  function Connect(){
    console.log(
      "Now attempting connect at " +
        document.getElementById('room').value +
        " at " +
        document.getElementById('name').value
    );

    const MSG = {
      method: 'connect',
      data: {
        room: document.getElementById('room').value,
        name: document.getElementById('name').value,
      },
    };

    props.ws.send(JSON.stringify(MSG)); // Accessing the WebSocket instance from props
  };

  return (
    <div>
      <h1>Room Code</h1>
      <input id="room" type="text" autoCapitalize="true"/>
      <h1>Name</h1>
      <input id="name" type="text" autoCapitalize="true"/>
      <br />
      <br />
      <input type="button" value="Join Game" onClick={Connect} />
    </div>
  );
};

export default OpenInterface;
