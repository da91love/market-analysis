import React from 'react';
import { MDBListGroup, MDBListGroupItem } from "mdbreact";
import _ from "lodash";
import BookMark from "./BookMark";
import Notification from "./Notification";

const Navigator = () => {

  return (
    <div className="fixed-bottom mb-3" >
        <MDBListGroup className="float-right" style={{ width: "auto" }}>
            <MDBListGroupItem className="p-0">
                <Notification />
            </MDBListGroupItem>
            <MDBListGroupItem className="p-0">
                <BookMark />
            </MDBListGroupItem>
        </MDBListGroup>
    </div>
    );
}

export default Navigator;