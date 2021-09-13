import PropTypes from 'prop-types';
import './styles.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles, createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { InputBase } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";



import { CURRENT_EMPLOYEE } from '../../actionTypes';
import imageExists from 'image-exists';

const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const theme = createTheme({
  palette: {
    primary: {
      main:  "#008000"
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
      margin: "1",
      width: '400px',
    },
    '& .MuiButtonBase-root': {
      margin: "2"
    },
  },
  textField: {
    paddingTop: "5px",
    'focused': {
        border: '1px solid green'
    }
    // '& hover' :{
    //   border: '1px solid green'
    // }
  },
  button: {
    marginLeft: "10px",
    background: 'green',
    color: 'white'
  },
  select: {
    width: '100%',
    // border: '1px solid #b6b6b6',
    // '&:hover':{
    //   border: '1px solid green',
    // },
    // '&:after': {
    //   border: '1px solid green',
    // },
    marginBottom: "5px"
  },
  selectDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '5px',
    marginBottom: "5px"
  }
}));


const AddEmployee = ({ open, onDiscard, onSubmit, locations, departments }) => {
  const classes = useStyles();
  const employee = useSelector((state) => state.employees.currentEmployee);
  const dispatch = useDispatch();
  const [stateEmployee, setStateEmployee] = useState({});
  // if (employee) {
  //   console.log('employeee hereee');
  // }
  // else {
  //   console.log('imployee missing');
  // }
  // console.log('employyeee', employee);
  // const [stateEmployee, setStateEmployee] = useState({
  //
  // });
  useEffect(() => {
    setStateEmployee({
      _id: employee ? employee._id : null,
      firstName: employee ? employee.name.slice(0, employee.name.indexOf(" ")) : "",
       lastName: employee ? employee.name.slice(employee.name.indexOf(" ")) : "",
       email: employee ? employee.email : "",
       imageUrl: employee ? employee.imageUrl : "",
       location : employee ? employee.locationId._id : locations ? locations[0]._id : "",
       department : employee ? employee.departmentId._id : departments? departments[0]._id : "",
    })
  }, [employee])  // if (employee) {
  //   console.log('in iffff xxx');

  // }
  console.log('state employee', stateEmployee);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidImage, setInvalidImage] = useState(false);
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [imageUrl, setImageUrl] = useState('');
  // const [location, setLocation] = useState('');
  // const [department, setDepartment] = useState('');
  // console.log('deps', departments);

  const onCancelClicked = (e) => {
    console.log('on cancel clicked');
    dispatch({ type: CURRENT_EMPLOYEE, payload: null });
    setInvalidEmail(false);
    setInvalidImage(false);
    // if (stateEmployee.firstName) {
    //   setStateEmployee({
    //     ...stateEmployee,
    //     firstName: ""
    //   });
    // }
    // if (stateEmployee.lastName) {
    //   setStateEmployee({
    //     ...stateEmployee,
    //     lastName: ""
    //   });
    // }
    // if (stateEmployee.email) {
    //   setStateEmployee({
    //     ...stateEmployee,
    //     email: ""
    //   });
    // }
    // if (stateEmployee.imageUrl) {
    //   setStateEmployee({
    //     ...stateEmployee,
    //     imageUrl: ""
    //   });
    // }
    // if (stateEmployee.department) {
    //   setStateEmployee({
    //     ...stateEmployee,
    //     department: departments[0]._id
    //   });
    // }
    // if (stateEmployee.department) {
    //   setStateEmployee({
    //     ...stateEmployee,
    //     location: locations[0]._id
    //   });
    // }
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
    console.log('empooytt', employee);
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
            console.log('emp to add', employeeToAdd);
            onSubmit(employeeToAdd);
        }
        else {
          setInvalidImage(true);
        }
      })
    }
  }

  const handleDepChange = (e) => {
    console.log('eee dep', e);
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
    console.log('email::', e);
    setStateEmployee({
      ...stateEmployee,
      email: e
    })
    if (!invalidEmail && !re.test(e.toLowerCase())) {
      console.log('in invalid');
      setInvalidEmail(true);
    }
  }

  const handleImageChange = (e) => {
    console.log('image1', e);
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
        <DialogTitle id="alert-dialog-title">
          {employee ? `Edit Employee` : `Add Employee`}
        </DialogTitle>
        <DialogContent>
          <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
                label="First Name"
                variant="filled"
                required
                value={stateEmployee.firstName}
                className={classes.textField}
                color="primary"
                onChange={(e) => onChangeFirstName(e)}
            />
            <TextField
              label="Last Name"
              variant="filled"
              required
              value={stateEmployee.lastName}
              className={classes.textField}
              color="primary"
              onChange={e => setStateEmployee({...stateEmployee, lastName: e.target.value.trim()})}
            />
            {invalidEmail ? <TextField
              error
              id="standard-error-helper-text"
              label="Error"
              value={stateEmployee.email}
              helperText="Invalid Email"
              focused
              onChange={(e => handleInvalidEmail(e.target.value))}/>:
            <TextField
              label="Email"
              variant="filled"
              required
              value={stateEmployee.email}
              className={classes.textField}
              onChange={e => handleEmailChange(e.target.value)}
            />}
            {invalidImage ? <TextField
              error
              id="standard-error-helper-text"
              label="Error"
              value={stateEmployee.imageUrl}
              helperText="Invalid Image Url"
              onChange={(e => handleInvalidImage(e.target.value))}
            /> : <TextField
              label="Image Url"
              variant="filled"
              required
              value={stateEmployee.imageUrl}
              className={classes.textField}
              onChange={e => handleImageChange(e.target.value)}
            />}
            <div className={classes.selectDiv}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={stateEmployee.department ? stateEmployee.department : departments && departments.length ?[0]._id : 0}
                onChange={handleDepChange}
                variant="filled"
                className={classes.select}
                required
              >
              {departments && departments.length && departments.map((item) => <MenuItem value={item._id}>{item.title}</MenuItem>)}
              </Select>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={stateEmployee.location ? stateEmployee.location : locations && locations.length ?[0]._id : 0}
                onChange={handleLocationChange}
                className={classes.select}
                variant="filled"
              >
              {locations && locations.length && locations.map((item) => <MenuItem value={item._id}>{item.name}</MenuItem>)}
              </Select>
            </div>
            <div>
              <Button
                variant="contained"
                onClick={(e) => onCancelClicked(e)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                className={classes.button}
              >
               {employee ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </MuiThemeProvider>
  )
}

AddEmployee.defaultProps = {
}
export default AddEmployee;
