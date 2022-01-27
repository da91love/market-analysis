import React from 'react';
import {MDBContainer} from 'mdbreact';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/lab/TabPanel';

const CTest = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MDBContainer className="mt-5 mb-5 pt-5 pb-5">
      {'WHAT THE FK?'}
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
    </MDBContainer>
  );
}

export default CTest;