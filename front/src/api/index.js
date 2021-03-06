// libraries
import axios from 'axios';
// constants
import { SERVER_URL, EMPLOYEE_LIMIT } from '../constants.js';
const API_CONFIG = {
    'Content-Type': 'application/json',
};

/**
 * [getDepartments {get} api to get departments from server]
 * @return {object} server response
 */
export const getDepartments = () => {
  return axios.get(`${SERVER_URL}/department/getDepartments`, API_CONFIG);
}

/**
 * [getLocations {get} api to get locations from server]
 * @return {object} server response
 */
export const getLocations = () => {
  return axios.get(`${SERVER_URL}/location/getLocations`, API_CONFIG);
}

/**
 * [getEmployees {get} api to get locations from server with filter conditions, limit and offset
 * @return {object} server response
 */
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

/**
 * [deleteEmployeeById {delete} api to delete employee by id
 * @return {[object]}  server response
 */
export const deleteEmployeeById = ({ employeeId }) => {

  return axios.delete(`${SERVER_URL}/employee/deleteEmployee?employeeId=${employeeId}`);
}

/**
 * [addEmployeeApi {post} api to create employee
 * @return {[object]}  server response
 */
export const addEmployeeApi = (employee) => {
  return axios.post(`${SERVER_URL}/employee/addEmployee`, employee, API_CONFIG);
}

/**
 * [editEmployeeApi {put} api to create employee
 * @return {[object]}  server response
 */
export const editEmployeeApi = (employee) => {
  return axios.put(`${SERVER_URL}/employee/editEmployee`, employee, API_CONFIG);
}
