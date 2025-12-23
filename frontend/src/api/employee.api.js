import axiosInstance from "./axiosInstance";

// Get employees under organization
 export const getEmployeesByOrgAPI = () => {
  return axiosInstance.get("/employees/org");
};

// Search employees
export const searchEmployeeAPI = (params) => {
  return axiosInstance.get("/employees/search", { params });
};

// Get logged-in employee profile
export const getEmployeeProfileAPI = (id) => {
  return axiosInstance.get(`/employees/profile/${id}`);
};

// Create employee (ORG ADMIN)
export const createEmployeeAPI = (data) => {
  return axiosInstance.post("/employees/create", data);
};

// Create employee (ORG ADMIN)
export const employeeLoginAPI = (data) => {
  return axiosInstance.post("/employees/login", data);
};

