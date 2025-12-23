import axiosInstance from "./axiosInstance";

// Get organization by ID
export const getOrgByIdAPI = (orgId) => {
  return axiosInstance.get(`/organizations/${orgId}`);
};

// Register organization
export const registerOrg = (data) => {
  return axiosInstance.post("/organizations/register", data);
};

// Organization login
export const orgLoginAPI = (data) => {
  return axiosInstance.post("/organizations/login", data);
};

export const getEmployeesByOrgAPI = (orgName) => {
  return axiosInstance.get(`/employees/org/${orgName}`);
};

