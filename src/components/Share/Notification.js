import React, {useState, useContext} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CompareTgContext from '../../contexts/CompareTgContext';

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { compareTg, setCompareTg } = useContext(CompareTgContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="fixed-bottom" style={{marginBottom: "7rem"}}>
        <Button className="float-right" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} variant="contained" color="secondary">
        Secondary
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
            {compareTg.map((v, i) => {
              return <MenuItem onClick={handleClose}>{`${v.shareCode}:${v.shareName}`}</MenuItem>
            })}
        </Menu>
    </div>
    );
}

export default Notification;