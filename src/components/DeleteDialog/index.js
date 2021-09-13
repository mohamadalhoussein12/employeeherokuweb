import PropTypes from 'prop-types';
import './styles.css';
import { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import { makeStyles } from '@material-ui/core/styles';



const DeleteDialog = ({ employee, onConfirm, onDiscard, open }) => {
  console.log('employee inside', employee);

  const handleDiscard = () => {
    onDiscard();
  }
  const handleConfirm = () => {
    onConfirm()
  }

  const useStyles = makeStyles((theme) => ({
  deleteDialog: {
    color: '1px solid green',
    // '&:hover':{
    //   border: '1px solid green',
    // },
    // '&:after': {
    //   border: '1px solid green',
    // },
    // marginRight: '10px',
    // borderRadius: '5px',
    // textAlign: 'center',
  },
  confirmButton: {
    color:'red',
    '&:hover':{
      background: 'red',
      color: 'white'
    },
  },
  cancelButton: {
    '&:hover':{
      background: '#b6b6b6',
      color: 'white'
    },
  }
}));

const classes = useStyles();

  return (
    <Dialog
      className={classes.deleteDialog}
      open={open}
      onClose={handleDiscard}
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete ${employee.name} account?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirm} className={classes.confirmButton}>
            Yes
          </Button>
          <Button className={classes.cancelButton} onClick={handleDiscard} color="red" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
  )
}

DeleteDialog.defaultProps = {
}
export default DeleteDialog;
