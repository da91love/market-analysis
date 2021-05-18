import React, { useState, useEffect } from "react";
import event from "./eventBus";
import {
    MDBContainer
  } from 'mdbreact';

export const Modal = () => {
  const [content, setContent] = useState("no content");
  const [showModal, setShowModal] = useState(false);

  const setMessage = (message) => {
    setContent(message);
    setShowModal(true);
  };
  const clearMessage = () => {
    setContent("");
    setShowModal(false);
  };

  useEffect(() => {
    event.on("showModal", setMessage).on("clearAllMessage", clearMessage);
  }, []);
  if (showModal) {
    return (
      <MDBContainer>
        <h2>{content}</h2>
        <button onClick={clearMessage}>Close Modal </button>
      </MDBContainer>
    );
  }
  return null;
};
