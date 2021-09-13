import React, { useState, useEffect } from 'react';
import EmployeeCard from './EmployeeCard';
import "./styles.css";

const EmployeeList = ({ employees, onDeleteEmployee, onEditEmployee }) => {
  return (
    <div className="employees-list">
      {employees.map((employee) => (
        <EmployeeCard
        employee={employee}
        handleDelete={(e) => onDeleteEmployee(e)}
        handleEdit={(e) => onEditEmployee(e)}
        />
      ))}
    </div>
  )
}


export default EmployeeList;
