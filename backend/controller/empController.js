import Employee from "../models/emp.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

  //Route 1: CREATE EMPLOYEE (ORG ADMIN)
export const createEmployee = async (req, res) => {
  try {
    const {
      empName,
      mobileNumber,
      aadhaarNumber,
      address,
      password,
      
    } = req.body;

    const exists = await Employee.findOne({ aadhaarNumber });
    if (exists) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await Employee.create({
      empName,
      mobileNumber,
      aadhaarNumber,
      address,
      password: hashedPassword,
    
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 //Route 2: EMPLOYEE LOGIN
export const employeeLogin = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    if (!mobileNumber  || !password) {
      return res.status(400).json({ message: "Credentials required" });
    }

    const employee = await Employee.findOne({ mobileNumber });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // JWT CREATION
    const token = jwt.sign(
      {
        id: employee._id,
        role: "emp"
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    res.json({
      message: "Employee login successful",
      token,
      employee: {
        id: employee._id,
        empName: employee.empName,
        mobileNumber: employee.mobileNumber,
        aadhaarNumber: employee.aadhaarNumber,
        address: employee.address
    },
  });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



//Route 3: GET EMPLOYEE PROFILE
export const getEmployeeProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id).select("-password");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


  //Route 4: UPDATE EMPLOYEE PROFILE
export const updateEmployeeProfile = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    ).select("-password");

    res.json({
      message: "Profile updated successfully",
      updatedEmployee
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

    //Route 5: GET EMPLOYEES BY ORG (ORG ADMIN)
export const getEmployeesByOrg = async (req, res) => {
  try {
    const employees = await Employee.find({
      currentOrg: req.orgId,
    });

    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



    //Route 6: ADD ORG HISTORY (ORG ADMIN)
export const addOrgHistory = async (req, res) => {
  try {
    const { empId } = req.params;
    const { orgName, dateOfJoining, dateOfLeaving, remark } = req.body;

    const employee = await Employee.findById(empId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.orgHistory.push({
      orgName,
      dateOfJoining,
      dateOfLeaving,
      remark
    });

    await employee.save();

    res.json({
      message: "Organization history added",
      employee
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


   //Route 7: SEARCH EMPLOYEE
export const searchEmployee = async (req, res) => {
  try {
    const { name, role } = req.query;

    let query = {};

    if (name) {
      query.empName = { $regex: name, $options: "i" };
    }
    if (role) {
      query.role = role;
    }

    const employees = await Employee.find(query).select("-password");

    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Route 8: Search employee by mobile or aadhaar
export const searchEmployeeByContact = async (req, res) => {
  try {
    const { mobileNumber, aadhaarNumber } = req.query;

    // Validation
    if (!mobileNumber && !aadhaarNumber) {
      return res.status(400).json({
        message: "Mobile number or Aadhaar number is required"
      });
    }

    // MongoDB OR condition
    const employee = await Employee.findOne({
      $or: [
        { mobileNumber },
        { aadhaarNumber }
      ]
    }).select("-password");

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.json({
      message: "Employee found",
      employee
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};