// libraries
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import imageExists from 'image-exists';

// material ui
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, createTheme, MuiThemeProvider } from '@material-ui/core/styles';

// constants
import { CURRENT_EMPLOYEE } from '../../actionTypes';
const re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const theme = createTheme({
  palette: {
    primary: {
      main:  '#008000'
    }
  },
  typography: { useNextVariants: true },
});

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    '& .MuiTextField-root': {
      margin: '1',
      width: '400px',
    },
    '& .MuiButtonBase-root': {
      margin: '2'
    },
  },
  textField: {
    paddingTop: '5px',
    'focused': {
        border: '1px solid green'
    },
  },
  button: {
    marginLeft: '10px',
    background: 'green',
    color: 'white'
  },
  select: {
    width: '100%',
    marginBottom: '5px'
  },
  selectDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '5px',
    marginBottom: '5px'
  }
}));


const AddEmployee = ({ onDiscard, onSubmit, locations, departments }) => {
  const classes = useStyles();
  const employee = useSelector((state) => state.employees.currentEmployee);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [stateEmployee, setStateEmployee] = useState({});
  useEffect(() => {
    setStateEmployee({
      _id: employee ? employee._id : null,
      firstName: employee ? employee.name.slice(0, employee.name.indexOf(' ')) : '',
      lastName: employee ? employee.name.slice(employee.name.indexOf(' ')) : '',
      email: employee ? employee.email : '',
      imageUrl: employee ? employee.imageUrl : '',
      location : employee && employee.locationId ? employee.locationId._id : locations ? locations[0]._id : '',
      department : employee && employee.departmentId ? employee.departmentId._id : departments? departments[0]._id : '',
    })
  }, [employee])
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidImage, setInvalidImage] = useState(false);

  const onCancelClicked = (e) => {
    setOpen(false);
    dispatch({ type: CURRENT_EMPLOYEE, payload: null });
    setInvalidEmail(false);
    setInvalidImage(false);
    onDiscard(e);
  }

  const onChangeFirstName = (e) => {
    setStateEmployee({
      ...stateEmployee,
      firstName: e.target.value.trim()
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!re.test(stateEmployee.email.toLowerCase())) {
      setInvalidEmail(true);
    }
    else {
      setInvalidEmail(false);
      imageExists(stateEmployee.imageUrl, exists => {
        if (exists) {
          setInvalidImage(false);
          const employeeToAdd = {
            _id: stateEmployee._id ? stateEmployee._id : null,
            name: `${stateEmployee.firstName.charAt(0).toUpperCase()}${stateEmployee.firstName.slice(1)} ${stateEmployee.lastName.charAt(0).toUpperCase()}${stateEmployee.lastName.slice(1)}`,
            email: stateEmployee.email.toLowerCase().trim(),
            imageUrl: stateEmployee.imageUrl.trim(),
            departmentId: stateEmployee.department || departments[0]._id,
            locationId: stateEmployee.location || locations[0]._id
          }
          onSubmit(employeeToAdd);
          setOpen(false);
        }
        else {
          setInvalidImage(true);
        }
      })
    }
  }

  const handleDepChange = (e) => {
    setStateEmployee({
      ...stateEmployee,
      department: e.target.value
    })
  }

  const handleLocationChange = (e) => {
    setStateEmployee({
      ...stateEmployee,
      location: e.target.value
    })
  }

  const handleInvalidEmail = (e) => {
    setStateEmployee({
      ...stateEmployee,
      email: e
    })
    if (re.test(e.toLowerCase())) {
      setInvalidEmail(false);
    }

  }

  const handleInvalidImage = (e) => {
    setStateEmployee({
      ...stateEmployee,
      imageUrl: e
    })
    imageExists(e, (exists) => {
      if (exists) {
        setInvalidImage(false);
      }
      else {
        if (!invalidImage) {
          setInvalidImage(true);
        }
      }
    })
  }

  const handleEmailChange = (e) => {
    setStateEmployee({
      ...stateEmployee,
      email: e
    })
    if (!invalidEmail && !re.test(e.toLowerCase())) {
      setInvalidEmail(true);
    }
  }

  const handleImageChange = (e) => {
    setStateEmployee({
      ...stateEmployee,
      imageUrl: e
    })
    imageExists(e, (exists) => {
      if (exists) {
        if (invalidImage) {
          setInvalidImage(false);
        }
      }
      else {
        if (!invalidImage) {
          setInvalidImage(true);
        }
      }
    })
  }
  return (
    <MuiThemeProvider theme={theme}>

      <Dialog
        open={open}
        onClose={(e) => onCancelClicked(e)}
      >
        <DialogTitle id='alert-dialog-title'>
          {employee ? `Edit Employee` : `Add Employee`}
        </DialogTitle>
        <DialogContent>
          <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
                label='First Name'
                variant='filled'
                required
                autoFocus
                value={stateEmployee.firstName}
                className={classes.textField}
                color='primary'
                onChange={(e) => onChangeFirstName(e)}
            />
            <TextField
              label='Last Name'
              variant='filled'
              required
              autoFocus
              value={stateEmployee.lastName}
              className={classes.textField}
              color='primary'
              onChange={e => setStateEmployee({...stateEmployee, lastName: e.target.value.trim()})}
            />
            {invalidEmail ? <TextField
              error
              id='standard-error-helper-text'
              label='Error'
              value={stateEmployee.email}
              helperText='Invalid Email'
              autoFocus
              onChange={(e => handleInvalidEmail(e.target.value))}/>:
            <TextField
              label='Email'
              variant='filled'
              required
              autoFocus
              value={stateEmployee.email}
              className={classes.textField}
              onChange={e => handleEmailChange(e.target.value)}
            />}
            {invalidImage ? <TextField
              error
              id='standard-error-helper-text'
              label='Error'
              value={stateEmployee.imageUrl}
              autoFocus
              helperText='Invalid Image Url'
              onChange={(e => handleInvalidImage(e.target.value))}
            /> : <TextField
              label='Image Url'
              variant='filled'
              required
              autoFocus
              value={stateEmployee.imageUrl}
              className={classes.textField}
              onChange={e => handleImageChange(e.target.value)}
            />}
            <div className={classes.selectDiv}>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={stateEmployee.department ? stateEmployee.department : departments && departments.length ?[0]._id : 0}
                autoFocus
                onChange={handleDepChange}
                variant='filled'
                className={classes.select}
                required
              >
              {departments && departments.length && departments.map((item) => <MenuItem value={item._id}>{item.title}</MenuItem>)}
              </Select>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={stateEmployee.location ? stateEmployee.location : locations && locations.length ?[0]._id : 0}
                autoFocus
                onChange={handleLocationChange}
                className={classes.select}
                variant='filled'
              >
              {locations && locations.length && locations.map((item) => <MenuItem value={item._id}>{item.name}</MenuItem>)}
              </Select>
            </div>
            <div>
              <Button
                variant='contained'
                onClick={(e) => onCancelClicked(e)}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='contained'
                className={classes.button}
              >
               {employee ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </MuiThemeProvider>
  )
}

// default props
AddEmployee.defaultProps = {
  locations: [],
  departments: [],
  open: false
}

//prop types
AddEmployee.propTypes = {
  locations: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  departments: PropTypes.array.isRequired,
  onDiscard: PropTypes.func.isRequired
}
export default AddEmployee;
