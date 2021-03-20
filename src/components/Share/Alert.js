import React, { useState, useContext, useEffect } from 'react';
import { MDBContainer, MDBAlert } from 'mdbreact';
import AlertContext from '../../contexts/AlertContext';

const Alert = () => {
  const { alertState } = useContext(AlertContext);
  const [message, setMessage] = useState(alertState);

  useEffect(() => {
    setMessage(alertState);
  }, [alertState]);

  return (
    <MDBContainer key={message.eventCount} fluid>
      {message? 
        <MDBAlert className="fixed-top mt-5" color={message.eventType} dismiss>
          {message.eventMessage}
        </MDBAlert>
        :null}
    </MDBContainer>
  );
};

export default Alert;
