import { useNavigate } from "react-router-dom";
import "./auth.css";

const SelectRole = () => {
  const navigate = useNavigate();

  return (

    <div className="auth-container">
      <div className="auth-card">
      <h2>Select Login Type</h2>

      <button onClick={() => navigate("/org/login")}>
        Organization Login
      </button>

      <button onClick={() => navigate("/employee/login")}>
        Employee Login
      </button>
    </div>
    </div>
  );
};

export default SelectRole;
