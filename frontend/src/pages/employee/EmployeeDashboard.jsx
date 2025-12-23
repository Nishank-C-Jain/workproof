import { useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar.jsx";
import { getEmployeeProfileAPI } from "../../api/employee.api.js";

const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getEmployeeProfileAPI();
      setEmployee(res.data);
    } catch (error) {
      alert("Failed to load profile");
    }
  };

  if (!employee) return <h3>Loading...</h3>;

  const currentOrg = employee.orgHistory?.slice(-1)[0];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ marginLeft: "220px", padding: "20px" }}>
        <h2>Employee Dashboard</h2>

        <p>
          <strong>Name:</strong> {employee.empName}
        </p>
        <p>
          <strong>Mobile:</strong> {employee.mobileNumber}
        </p>
        <p>
          <strong>Role:</strong> {employee.role}
        </p>

        {currentOrg && (
          <>
            <h3>Current Organization</h3>
            <p>
              <strong>Org Name:</strong> {currentOrg.orgName}
            </p>
            <p>
              <strong>Date of Joining:</strong>{" "}
              {new Date(currentOrg.dateOfJoining).toLocaleDateString()}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
