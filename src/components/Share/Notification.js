import React from "react";
import { MDBContainer, MDBNotification } from "mdbreact";

const Notification = () => {
    return (
        <MDBNotification
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