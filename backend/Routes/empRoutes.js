import express from "express";
const router = express.Router();

//import { createEmployee } from "../controller/empController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import orgAdminOnly from "../middleware/roleMiddleware.js";

 import {
  createEmployee,
  employeeLogin,
  getEmployeeProfile,
  updateEmployeeProfile,
  getEmployeesByOrg,
  addOrgHistory,
  searchEmployeeByContact,
  searchEmployee,
} from "../controller/empController.js";
import { verifyOrg } from "../middleware/verifyOrgMiddleware.js";

// Route 1: Create Employee (Org Admin only)
router.post("/create", createEmployee );

// Route 2: Employee Login (Public)
router.post("/login", employeeLogin );

// Route 3: Get Employee Profile (Employee only)
router.get("/profile/:id", getEmployeeProfile );

// Route 4: Update Employee Profile (Employee only)
router.put("/update", updateEmployeeProfile );

// Route 5: Get Employees by Organization (Org Admin only)
router.get("/employees/org/:orgName", verifyOrg, getEmployeesByOrg);

// Route 6: Add Org History (Org Admin only)
router.post("/org-history/:empId", addOrgHistory );

// Route 7: Search Employee (Org Admin only)
router.get("/search", searchEmployee);

// Route 8: Search employee by mobile or aadhaar
router.get("/search/by-contact", searchEmployeeByContact);

router.get("/profile/:id", getEmployeeProfile);


export default router;
