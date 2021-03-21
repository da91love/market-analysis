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
    <>
      {message.eventCount > 0? 
        <MDBContainer key={message.eventCount} fluid>
            <MDBAlert className="fixed-top" color={message.eventType} dismiss>
              {message.eventMessage}
            </MDBAlert>
        </MDBContainer>
      :null}
    </>
  );
};

export default Alert;
