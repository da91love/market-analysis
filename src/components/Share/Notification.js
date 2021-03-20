import React from "react";
import { MDBContainer, MDBNotification } from "mdbreact";

const Notification = () => {
    return (
        <MDBNotification
            className="fixed-bottom mt-5"
            iconClassName="text-primary"
            show
            fade
            title="Bootstrap"
            message="Hello, world! This is a toast message."
            text="11 mins ago"
        />
    );
}

export default Notification;