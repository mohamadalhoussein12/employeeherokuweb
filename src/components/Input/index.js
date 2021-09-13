import PropTypes from 'prop-types';
import './styles.css';
import SearchIcon from "@material-ui/icons/Search";



const Input = ({ label, isSearch, onChangeInput, placeholder }) => {
  const onBlur = (e) => {
    e.target.value=''
    onChangeInput(e);
    return e;
  }

  return (
    <div className='input-row'>
        <div className='input-row position-relative'>
          <input
          className='search-input'
          placeholder={placeholder}
          // onBlur={(e) => onBlur(e)}
          onChange={(e) => onChangeInput(e)}
          />
          {isSearch && <SearchIcon className='search-icon'/>}
        </div>
    </div>
  )
}

Input.defaultProps = {
}
export default Input;
