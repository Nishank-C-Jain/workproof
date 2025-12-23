import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { employeeLoginAPI } from "../../../api/auth.api.js";
import { setToken } from "../../../utils/token.js";
import "../auth.css";

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    mobileNumber: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await employeeLoginAPI(form);
      setToken(res.token);
      navigate(`/employee/profile/${res.employee.id}`);
    } catch {
      alert("Employee login failed");
    }
  };

  return (
    <div className="auth-container">
  <div className="auth-card">
    <form onSubmit={handleSubmit}>
      <h2>Employee Login</h2>

      <input
        name="mobileNumber"
        placeholder="Mobile or Aadhaar"
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button>Login</button>

      <p>
        New Employee?{" "}
        <Link to="/employee/register">Register here</Link>
      </p>
    </form>
    </div>
    </div>
  );
};

export default EmployeeLogin;
