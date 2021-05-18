import React from "react";
import { Modal } from "./Modal";
import { ModalPublisher } from "./ModalPublisher";

export default function CTest() {
  return (
    <div className="App mt-5 pt-5">
      <Modal showModal={true} />
      <h1
        onClick={() => {
          ModalPublisher.message("this is the content from App");
        }}
      >
        Hello CodeSandbox
      </h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}