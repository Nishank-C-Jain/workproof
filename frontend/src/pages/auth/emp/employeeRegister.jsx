import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance.js";
import "../auth.css";

const EmployeeRegister = () => {
  const [form, setForm] = useState({
    empName: "",
    mobileNumber: "",
    aadhaarNumber: "",
    password: "",
    address: "",  
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/employees/create", form);
      alert("Employee Registered");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
    <form onSubmit={handleSubmit}>
      <h2>Employee Register</h2>

      <input name="empName" placeholder="Name" onChange={handleChange} />
      <input name="mobileNumber" placeholder="Mobile" onChange={handleChange} />
      <input name="aadhaarNumber" placeholder="Aadhaar" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button>Register</button>

      <p>
        Already registered? <Link to="/employee/login">Login</Link>
      </p>
    </form>
    </div>
    </div>
  );
};

export default EmployeeRegister;
