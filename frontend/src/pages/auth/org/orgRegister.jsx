import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance.js";
import "../auth.css";

const OrgRegister = () => {
  const [form, setForm] = useState({
    orgName: "",
    orgType: "",
    description: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/organizations/create", form);
      alert("Organization Registered");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
    <form onSubmit={handleSubmit}>
      <h2>Organization Register</h2>

      <input name="orgName" placeholder="Org Name" onChange={handleChange} />
      <input name="orgType" placeholder="Org Type" onChange={handleChange} />
      <input
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button>Register</button>

      <p>
        Already registered?{" "}
        <Link to="/org/login">Login</Link>
      </p>
    </form>
    </div>
    </div>
  );
};

export default OrgRegister;
