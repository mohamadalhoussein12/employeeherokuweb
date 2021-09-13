import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { Search } from '@material-ui/icons';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

import Input  from '../Input';
import './styles.css';


const Filter = ({ changeSarchInput, handleButtonClick, handleSelectedDep, handleSelectedLocation }) => {

  const departments = useSelector((state) => state.departments.departments);
  const locations = useSelector((state) => state.locations.locations);
  const [selectedDep, setSlectedDep] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const [searchInput, setSearchInput] = useState('');
  const [addButtonClicked, setAddButtonClicked] = React.useState(false);

  const useStyles = makeStyles((theme) => ({
  selectDropDown: {
    width: '100px',
    border: '1px solid #b6b6b6',
    '&:hover':{
      border: '1px solid green',
    },
    '&:after': {
      border: '1px solid green',
    },
    marginRight: '10px',
    borderRadius: '5px',
    textAlign: 'center',
  },
  button: {
    border: '1px solid green',
    background: 'green',
    color:'white',
    '&:hover':{
      background: 'green'
    },
  }
}));

const classes = useStyles();

  const handleChange = (e) => {
    console.log('idd', e);
    // setSearchInput(e);
    changeSarchInput(e);
  };

  const handleSelectChange = (e) => {
    setSlectedDep(e.target.value)
    handleSelectedDep(e);
  }

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value)
    handleSelectedLocation(e);
  }

  const handleAddClick = (e) => {
    handleButtonClick(e)
  }

  return (
    <div>
      <div className="filter-row">
        <Input
          label='Search Employees'
          placeholder='Type to Search'
          onChangeInput ={(e) => handleChange(e)}
          isSearch
        />
        <div className="select-div">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedDep ? selectedDep : 0}
            onChange={handleSelectChange}
            className={classes.selectDropDown}
          >
          <MenuItem value={0}>All</MenuItem>
          {departments && departments.length && departments.map((item) => <MenuItem value={item._id}>{item.title}</MenuItem>)}
          </Select>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedLocation ? selectedLocation : 1}
            onChange={handleLocationChange}
            className={classes.selectDropDown}
          >
          <MenuItem value={1}>All</MenuItem>
          {locations && locations.length && locations.map((item) => <MenuItem value={item._id}>{item.name}</MenuItem>)}
          </Select>
          <Button
            className={classes.button}
            onClick={(e) => handleAddClick(e)}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}

Filter.defaultProps = {
}

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired
}


export default Filter;
