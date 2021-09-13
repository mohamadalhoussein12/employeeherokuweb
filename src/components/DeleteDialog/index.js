// libraries
import PropTypes from 'prop-types';
import { useState } from 'react';

// material ui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  deleteDialog: {
    color: '1px solid green',
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

const DeleteDialog = ({ employee, onConfirm, onDiscard }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleCancel = () => {
    setOpen(false);
    onDiscard()
  }
  return (
    <Dialog
      className={classes.deleteDialog}
      open={open}
      onClose={onDiscard}
    >
      <DialogTitle id='alert-dialog-title'>
        {`Are you sure you want to delete ${employee.name} account?`}
      </DialogTitle>
      <DialogActions>
        <Button onClick={onConfirm} className={classes.confirmButton}>
          Yes
        </Button>
        <Button className={classes.cancelButton} onClick={handleCancel} color='red' autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// default props
DeleteDialog.defaultProps = {
  employee: {
    name: ''
  },
  open: false
}

//prop types
DeleteDialog.propTypes = {
  employee: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired
}
export default DeleteDialog;
