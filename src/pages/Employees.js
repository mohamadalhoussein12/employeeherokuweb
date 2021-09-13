import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

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

import { getAllDepartments } from '../actions/department';
import { getAllLocations } from '../actions/location';
import { EMPLOYEE_ERROR } from '../actionTypes';
import {
  getAllEmployees,
  deleteEmployee,
  addEmployee,
  editEmployee,
} from '../actions/employee';
import { EMPLOYEE_LIMIT } from '../constants';


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
  if (employeesErrors && employeesErrors.length && !openDialogError) {
    setOpenDialogError(true);
  }
  console.log('employeesErrors', employeesErrors);
  console.log('open dialog error', openDialogError);

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
    console.log('employees', employees);
  }, [])

  console.log('get emp', getEmployeesParams);
  console.log('employees', employees);


  const changeSearchInput = (e) => {
    console.log('change search input', e.target.value);
    setSearch(e.target.value);
    dispatch(getAllEmployees({
      ...getEmployeesParams,
      search: e.target.value,
      }
    ));
  }

  const handleSelectedDep = (e) => {
    console.log('change search input 11', e);
    setDepartment(e.target.value);
    dispatch(getAllEmployees({
      ...getEmployeesParams,
      departmentId: e.target.value,
      }
    ));
  }
  const handleSelectedLocation = (e) => {
    console.log('change search input 1122', e);
    setLocation(e.target.value);
    dispatch(getAllEmployees({
      ...getEmployeesParams,
      locationId: e.target.value,
      }
    ));
  }

  const paginationCount = employees && employees.totalCount ? Math.ceil(employees.totalCount/EMPLOYEE_LIMIT) : 0;

  const onChangeOffset = (page) => {
    console.log('in on change', page);
    const nextOffset = (page -1)*EMPLOYEE_LIMIT;
    console.log('next offset', nextOffset);
    setOffset(nextOffset);
    dispatch(getAllEmployees({
      ...getEmployeesParams,
      offset: nextOffset,
      }
    ));
  }

  const onDeleteEmployee = (id) => {
    // console.log('employee deleted');
    setOpenDelete(false);
    dispatch(deleteEmployee({ employeeId: id }));
    dispatch(getAllEmployees(getEmployeesParams));
    setEmployeeDelete(0);
    console.log('employee data', employeeDelete);
  }

  const deleteClicked = (id) => {
    console.log('in delete clicked', id);
    console.log('open delete in click', openDelete);
    console.log('open delete in click employee data', employeeDelete);
    if (!openDelete) {
      employees.data.forEach((item, i) => {
        console.log('in loop');
        if (item._id === id){
          console.log('in iff');
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

  const createEmployee = (emp) => {
    if (emp._id) {
      console.log('emp to edit', emp);
      dispatch(editEmployee(emp));
    }
    else {
      console.log('emp to create', emp);
      dispatch(addEmployee(emp))
    }
    setOpenAddModal(false);
  }

  const editEmployeeClicked = (employeeId) => {
    if (!openAddModal) {
      employees.data.forEach((item, i) => {
        console.log('in loop');
        if (item._id === employeeId){
          console.log('in iff');
          setOpenAddModal(true);
        }
      });
    }
  }




  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        justifyContent:"center",
        display:'flex',
        marginTop: "20px",
        marginBottom: "20px"
          // backgroundColor: "green"
      },
      "& .MuiPaginationItem-page.Mui-selected": {
        color: "white",
        backgroundColor: "green"
      }
    }
  }));
  const classes = useStyles();

  return (
    <div>
      <img
        src='logo512.png'
        alt='img'
        className='img-logo'
      />
      <Filter
        changeSarchInput={changeSearchInput}
        handleSelectedDep={handleSelectedDep}
        handleSelectedLocation={handleSelectedLocation}
        handleButtonClick={(e) => onAddClick(e)}
      />
      {
        employeesErrors &&
          <Dialog
            open={openDialogError}
            onClose={onCloseDialogError}
            >
              <DialogTitle id="alert-dialog-title">
                An error has occured
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {employeesErrors}
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
        /> : <p>No Employees to Show</p>
      }
      {paginationCount > 0 &&
        <div>
          <Pagination
            className={classes.root}
            count={paginationCount}
            onChange={(e, page) => onChangeOffset(page)}
          />
        </div>
      }
      {
        employeeDelete &&
        <DeleteDialog
          employee={employeeDelete}
          onConfirm={(e) => onDeleteEmployee(employeeDelete._id)}
          onDiscard={(e) => onDiscardDelete()}
          open={openDelete}
        />
      }
      {
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
