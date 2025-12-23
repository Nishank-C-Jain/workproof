import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { orgLoginAPI } from "../../../api/org.api.js";
import { setToken } from "../../../utils/token.js";
import axiosInstance from "../../../api/axiosInstance.js";
import axios from "../../../api/axiosInstance.js";
import jwtDecode from "jwt-decode";
import { decodeToken } from "../../../utils/decodeToken.js";
import "../auth.css";
import { useAuth } from "../../../auth/AuthContext.jsx";

const OrgLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    orgName: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await orgLoginAPI(form);
    // update AuthContext (this also stores token and decodes role)
    login({ token: res.data.token });
    navigate("/org/dashboard");
  } catch {
    alert("Org login failed");
  }
};

  return (
    <div className="auth-container">
  <div className="auth-card">
    <form onSubmit={handleSubmit}>
      <h2>Organization Login</h2>

      <input
        name="orgName"
        placeholder="Organization Name"
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
        New Org?{" "}
        <Link to="/org/register">Register here</Link>
      </p>
    </form>
    </div>
    </div>
  );
};

export default OrgLogin;