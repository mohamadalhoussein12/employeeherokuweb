// libraries
import PropTypes from 'prop-types';

// material ui
import SearchIcon from '@material-ui/icons/Search';
// css
import './styles.css';


const SearchInput = ({ placeholder, onChangeInput }) => {
  return (
    <div className='input-row'>
      <div className='input-row position-relative'>
        <input
          className='search-input'
          placeholder={placeholder}
          onChange={(e) => onChangeInput(e)}
        />
        <SearchIcon className='search-icon'/>
      </div>
    </div>
  )
}

// prop types
SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired
}

//default prop values
SearchInput.defaultProps = {
  placeholder: ''
}
export default SearchInput;
