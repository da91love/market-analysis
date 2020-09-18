import React, { useState, useContext, useEffect } from 'react';
import { MDBContainer, MDBAlert } from 'mdbreact';
import AlertContext from '../../contexts/AlertContext';

const Alert = () => {
  const { alertState } = useContext(AlertContext);
  const [message, setMessage] = useState(<></>);
  let tempMessage = <></>;

  useEffect(() => {
    if (alertState.eventType && alertState.eventMessage) {
      tempMessage = (
        <MDBContainer key={alertState.eventCount} fluid>
          <MDBAlert className="fixed-top mt-5" color={alertState.eventType} dismiss>
            {alertState.eventMessage}
          </MDBAlert>
        </MDBContainer>
      );
    } else {
      tempMessage = <></>;
    }
    setMessage(tempMessage);
  }, [alertState]);

  return message;
};

export default Alert;
