import { Link } from "react-router-dom";

const EmployeeList = ({ employees }) => {
  return (
    <table border="1" width="100%" cellPadding="8">
      <thead>
        <tr>
          <th>Name</th>
          <th>Aadhar Number</th>
          <th>Mobile</th>
          <th>Role</th>
          <th>Org</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp._id}>
            <td><Link to={`/employee/${emp._id}`}>{emp.empName}</Link></td>
            <td>{emp.aadhaarNumber}</td>
            <td>{emp.mobileNumber}</td>
            <td>{emp.role}</td>
            <td>{emp.currentOrg}ABC pvt.ltd</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
