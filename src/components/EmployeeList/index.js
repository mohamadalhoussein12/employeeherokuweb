// libraries
import PropTypes from 'prop-types';

// files
import EmployeeCard from './EmployeeCard';

//css
import "./styles.css";

const EmployeeList = ({ employees, onDeleteEmployee, onEditEmployee }) => {
  return (
    <div className="employees-list">
      {employees.map((employee) => (
        <EmployeeCard
        employee={employee}
        onDeleteClick={(e) => onDeleteEmployee(e)}
        onEditClick={(e) => onEditEmployee(e)}
        />
      ))}
    </div>
  )
}

// default props
EmployeeList.defaultProps = {
  employees: []
}

//prop types
EmployeeList.propTypes = {
  employees: PropTypes.array.isRequired,
  onDeleteEmployee: PropTypes.func.isRequired,
  onEditEmployee: PropTypes.func.isRequired
}

export default EmployeeList;
