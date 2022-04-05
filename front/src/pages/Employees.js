// libraries
import { useState, useEffect } from 'react';
// redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// material ui
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import Filter from '../components/Filter';
import EmployeeList from '../components/EmployeeList';
import DeleteDialog from '../components/DeleteDialog';
import AddEmployee from '../components/AddEmployee';

// files
import { getAllDepartments } from '../actions/department';
import { getAllLocations } from '../actions/location';
import {
  getAllEmployees,
  deleteEmployee,
  addEmployee,
  editEmployee,
} from '../actions/employee';

// constants
import { EMPLOYEE_ERROR, DEPARTMENTS_ERROR, LOCATIONS_ERROR } from '../actionTypes';
import { EMPLOYEE_LIMIT } from '../constants';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      justifyContent:'center',
      display:'flex',
      marginTop: '20px',
      marginBottom: '20px'
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      color: 'white',
      backgroundColor: 'green'
    }
  },
  logoDiv: {
    'paddingTop': '50px'
  },
  emptyDiv: {
    textAlign: 'center'
  }
}));

const Employees = () => {
  const dispatch = useDispatch();

  const [location, setLocation] = useState('');
  const [department, setDepartment] = useState('');
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const [employeeDelete, setEmployeeDelete] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDialogError, setOpenDialogError] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const locations = useSelector((state) => state.locations.locations);
  const departments = useSelector((state) => state.departments.departments);

  const employees = useSelector((state) => state.employees.employees);
  const employeesErrors = useSelector((state) => state.employees.error);
  const departmentErros = useSelector((state) => state.departments.error);
  const locationErros = useSelector((state) => state.locations.error);

  if (((employeesErrors && employeesErrors.length) || (departmentErros &&
     departmentErros.length) || (locationErros && locationErros.length)) && !openDialogError) {
    setOpenDialogError(true);
  }

  const getEmployeesParams = {
    search: search,
    departmentId: department,
    locationId: location,
    offset: offset
  };

  useEffect(() => {
    dispatch(getAllDepartments());
    dispatch(getAllLocations());
    dispatch(getAllEmployees(getEmployeesParams));
  }, [])


  const changeSearchInput = (e) => {
    setSearch(e.target.value);
    dispatch(getAllEmployees({
      ...getEmployeesParams,
      search: e.target.value,
      offset: 0,
    }));
    setOffset(0);
  }

  const handleSelectedDep = (e) => {
    setDepartment(e.target.value);
    dispatch(getAllEmployees({
      ...getEmployeesParams,
      departmentId: e.target.value,
      offset: 0,
    }))
    setOffset(0);
  }
  const handleSelectedLocation = (e) => {
    setLocation(e.target.value);
    dispatch(getAllEmployees({
      ...getEmployeesParams,
      locationId: e.target.value,
      offset: 0
    }));
    setOffset(0);
  }

  const paginationCount = employees && employees.totalCount ? Math.ceil(employees.totalCount/EMPLOYEE_LIMIT) : 0;

  const onChangeOffset = (page) => {
    const nextOffset = (page -1)*EMPLOYEE_LIMIT;
    setOffset(nextOffset);
    dispatch(getAllEmployees({
      ...getEmployeesParams,
      offset: nextOffset,
      }
    ));
  }

  const onDeleteEmployee = async (id) => {
    setOpenDelete(false);
    await dispatch(deleteEmployee({
      employeeId: id,
      getEmployeesCondtion: {
        ...getEmployeesParams,
        offset: 0
      }
    }));
    // await dispatch(getAllEmployees({
    //
    // }));
    setEmployeeDelete(0);
  }

  const deleteClicked = (id) => {
    if (!openDelete) {
      employees.data.forEach((item, i) => {
        if (item._id === id){
          setOpenDelete(true);
          setEmployeeDelete(item);
        }
      });
    }
  }

  const onDiscardDelete = () => {
    setOpenDelete(false);
    setEmployeeDelete(0);
  }

  const onCloseDialogError = () => {
    dispatch({ type: EMPLOYEE_ERROR, payload: []});
    dispatch({ type: DEPARTMENTS_ERROR, payload: []});
    dispatch({ type: LOCATIONS_ERROR, payload: []});
    setOpenDialogError(false);
  }

  const onAddClick = (e) => {
    if (!openAddModal) {
      setOpenAddModal(true);
    }
  }

  const onCloseAddModal = (e) => {
    e.preventDefault();
    setOpenAddModal(false);
  }

  const createEmployee = (employeeToAdd) => {
    if (employeeToAdd._id) {
      dispatch(editEmployee({
        employee: employeeToAdd,
        getEmployeesCondtion: {
          ...getEmployeesParams,
          offset: 0
        }
      }));
    }
    else {
      dispatch(addEmployee(employeeToAdd))
    }
    setOpenAddModal(false);
  }

  const editEmployeeClicked = (employeeId) => {
    if (!openAddModal) {
      employees.data.forEach((item, i) => {
        if (item._id === employeeId){
          setOpenAddModal(true);
        }
      });
    }
  }
  const classes = useStyles();
  return (
    <div>
      <div className={classes.logoDiv}>
        <img
          src='logo512.png'
          alt='img'
          className='img-logo'
        />
      </div>
      <Filter
        onSearchInputChange={changeSearchInput}
        onSelectDepartment={handleSelectedDep}
        onSelectLocation={handleSelectedLocation}
        onAddButtonClick={(e) => onAddClick(e)}
      />
      {
        openDialogError &&
        <Dialog
          open={openDialogError}
          onClose={onCloseDialogError}
        >
          <DialogTitle id='alert-dialog-title'>
            An error has occured
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {employeesErrors || departmentErros || locationErros}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseDialogError}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      }
      {employees && employees.data && employees.data.length > 0 ?
        <EmployeeList
          employees={employees.data}
          onDeleteEmployee={(e) => deleteClicked(e)}
          onEditEmployee={(e) => editEmployeeClicked(e)}
        /> : <div class={classes.emptyDiv}>No Employees to Show</div>
      }
      {paginationCount > 0 &&
        <div>
          <Pagination
            className={classes.root}
            count={paginationCount}
            page={offset === 0 ? 1 : offset/EMPLOYEE_LIMIT + 1}
            onChange={(e, page) => onChangeOffset(page)}
          />
        </div>
      }
      {
        openDelete &&
        <DeleteDialog
          employee={employeeDelete}
          onConfirm={(e) => onDeleteEmployee(employeeDelete._id)}
          onDiscard={(e) => onDiscardDelete()}
          open={openDelete}
        />
      }
      {
        openAddModal &&
        <AddEmployee
          open={openAddModal}
          onDiscard={(e) => onCloseAddModal(e)}
          departments={departments}
          locations={locations}
          onSubmit={(e) => createEmployee(e)}
        />
      }
    </div>
  )
}

export default Employees;
