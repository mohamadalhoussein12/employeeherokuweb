import axios from 'axios';
import { SERVER_URL, EMPLOYEE_LIMIT } from '../constants.js';

const API_CONFIG = {
    'Content-Type': 'application/json',
};

export const getDepartments = () => {
  return axios.get(`${SERVER_URL}/department/getDepartments`, API_CONFIG);
}

export const getLocations = () => {
  return axios.get(`${SERVER_URL}/location/getLocations`, API_CONFIG);
}

export const getEmployees = ({ search, departmentId, locationId, offset }) => {
  let apiUrl = `${SERVER_URL}/employee/getEmployees?limit=${EMPLOYEE_LIMIT}&offset=${offset}`;
  if (search) {
    apiUrl += `&search=${search}`;
  }
  if (departmentId) {
    apiUrl += `&departmentId=${departmentId}`;
  }
  if (locationId && locationId !== 1) {
    apiUrl += `&locationId=${locationId}`;
  }
  return axios.get(apiUrl, API_CONFIG);
}

export const deleteEmployeeById = ({ employeeId }) => {

  return axios.delete(`${SERVER_URL}/employee/deleteEmployee?employeeId=${employeeId}`);
}

export const addEmployeeApi = (employee) => {
  return axios.post(`${SERVER_URL}/employee/addEmployee`, employee, API_CONFIG);
}

export const editEmployeeApi = (employee) => {
  return axios.put(`${SERVER_URL}/employee/editEmployee`, employee, API_CONFIG);
}
