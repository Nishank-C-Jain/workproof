import axiosInstance from "./axiosInstance";

/* =========================
   EMPLOYEE AUTH
========================= */
export const employeeLoginAPI = (data) => {
  return axiosInstance.post("/employees/login", data);
};

export const employeeRegisterAPI = (data) => {
  return axiosInstance.post("/employees/create", data);
};

/* =========================
   ORGANIZATION AUTH
========================= */
export const orgLoginAPI = (data) => {
  return axiosInstance.post("/organizations/login", data);
};

export const orgRegisterAPI = (data) => {
  return axiosInstance.post("/organizations/create", data);
};

