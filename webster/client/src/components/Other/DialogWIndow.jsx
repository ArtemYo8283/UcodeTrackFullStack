import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import React, {  useState  } from 'react';
import {BootstrapDialog, DialogTitleEl, IconButtonEl} from '../../styles/DialogWindowStyle'
import {DialogContent, DialogActions} from '@mui/material';


const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitleEl {...other}>
      {children}
      {onClose ? (
        <IconButtonEl
          aria-label="close"
          onClick={onClose}
        >
          x
        </IconButtonEl>
      ) : null}
    </DialogTitleEl>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const DialogWindow = (props) => {
    const [open, setOpen] = useState(false);
  const navigate = useNavigate(); 
  function handleClose() {
    setOpen(false);
  }
  function handleMainPage() {
    navigate('/')
    document.location.reload();
  }
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.state}
      >
        <BootstrapDialogTitle id="customized-dialog-title">
          Success
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {props.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleMainPage}>
            Go to main page
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export {DialogWindow};
