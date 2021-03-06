import React from "react";
import { MDBInputGroup, MDBInput } from "mdbreact";

const PerFilter = (props) => {
    const {title} = props;

    return (
        <div className="mt-3">
            <p className="grey-text text-left">
                {title?title:"PER"}
            </p>
            <MDBInputGroup
                material
                containerClassName="m-2"
                inputs={
                <>
                    <MDBInput noTag className="pr-2" type="text" hint="Min" />
                    <MDBInput noTag className="pl-2" type="text" hint="Max" />
                </>
                }
            />
        </div>
    );
};

export default PerFilter;