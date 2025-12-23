import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.jsx";

const Sidebar = () => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.sidebar}>
      <h3 style={styles.title}>Dashboard</h3>

      {/* ORG MENU */}
      {role === "Admin" && (
        <>
          <Link to="/org/dashboard" style={styles.link}>
            Home
          </Link>
          <Link to="/org/profile" style={styles.link}>
            Organization Profile
          </Link>
          <Link to="/org/add-employee" style={styles.link}>
            Add Employee
          </Link>
        </>
      )}

      {/* EMPLOYEE MENU */}
      {role === "emp" && (
        <>
          <Link to="/employee/dashboard" style={styles.link}>
            Home
          </Link>
          <Link to="/employee/profile" style={styles.link}>
            My Profile
          </Link>
        </>
      )}

      <button onClick={handleLogout} style={styles.logout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#1f2937",
    color: "#fff",
    padding: "20px",
    position: "fixed",
  },
  title: {
    marginBottom: "20px",
  },
  link: {
    display: "block",
    color: "#fff",
    marginBottom: "12px",
    textDecoration: "none",
  },
  logout: {
    marginTop: "20px",
    width: "100%",
    padding: "8px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};
