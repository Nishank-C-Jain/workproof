import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance.js";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.jsx";

const EmployeeProfile = () => {
  const { id } = useParams();
  const { role } = useAuth();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios.get(`/employee/profile/${employee.id}`).then(res => {
      setEmployee(res.data);
    });
  }, [id]);

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="profile">
      <h1>Employee Profile</h1>
      <h2>Welcome to your profile</h2>
      <h2>{employee.empName}</h2>

      <p><b>Mobile:</b> {employee.mobileNumber}</p>
      <p><b>Aadhaar:</b> {employee.aadhaarNumber}</p>
      <p><b>Address:</b> {employee.address}</p>

      <hr />

      <h3>Organization History</h3>

      {employee.orgHistory.map((org, index) => (
        <div key={index} className="org-card">
          <p><b>Organization:</b> {org.orgName}</p>
          <p><b>Joining Date:</b> {org.dateOfJoining}</p>
          <p><b>Remark:</b> {org.remark}</p>
        </div>
      ))}
    </div>
  );
};

export default EmployeeProfile;
