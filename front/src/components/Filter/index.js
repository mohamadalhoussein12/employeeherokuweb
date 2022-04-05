// libraries
import { useState } from 'react';
import PropTypes from 'prop-types';

// redux
import { useSelector } from 'react-redux';

// material ui
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

// files
import SearchInput  from '../SearchInput';

// css
import './styles.css';
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
    '&:hover': {
      background: 'green'
    }
  }
}));

const Filter = ({ onSearchInputChange, onSelectDepartment, onSelectLocation, onAddButtonClick }) => {
  const classes = useStyles();
  const departments = useSelector((state) => state.departments.departments);
  const locations = useSelector((state) => state.locations.locations);
  const [selectedDep, setSlectedDep] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSearchChange = (e) => {
    onSearchInputChange(e);
  }

  const handleSelectChange = (e) => {
    setSlectedDep(e.target.value);
    onSelectDepartment(e);
  }

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value)
    onSelectLocation(e);
  }

  const handleAddButtonClick = (e) => {
    onAddButtonClick(e);
  }

  return (
    <div>
      <div className='filter-row'>
        <SearchInput
          placeholder='Type to Search'
          onChangeInput ={(e) => handleSearchChange(e)}
        />
        <div className='select-div'>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={selectedDep ? selectedDep : 0}
            onChange={handleSelectChange}
            className={classes.selectDropDown}
          >
            <MenuItem value={0}>All</MenuItem>
            {departments && departments.length && departments.map((item) => <MenuItem value={item._id}>{item.title}</MenuItem>)}
          </Select>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={selectedLocation ? selectedLocation : 1}
            onChange={handleLocationChange}
            className={classes.selectDropDown}
          >
            <MenuItem value={1}>All</MenuItem>
            {locations && locations.length && locations.map((item) => <MenuItem value={item._id}>{item.name}</MenuItem>)}
          </Select>
          <Button
            className={classes.button}
            onClick={(e) => handleAddButtonClick(e)}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}

// default props
Filter.defaultProps = {
}

//prop types
Filter.propTypes = {
  onSearchInputChange: PropTypes.func.isRequired,
  onSelectDepartment: PropTypes.func.isRequired,
  onSelectLocation: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func.isRequired
}


export default Filter;
