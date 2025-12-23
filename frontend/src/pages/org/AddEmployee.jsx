import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import { createEmployeeAPI } from "../../api/employee.api";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    empName: "",
    mobileNumber: "",
    aadhaarNumber: "",
    address: "",
    password: "",
    orgName: "",
    dateOfJoining: "",
    remark: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      empName: formData.empName,
      mobileNumber: formData.mobileNumber,
      aadhaarNumber: formData.aadhaarNumber,
      address: formData.address,
      password: formData.password,
      orgHistory: [
        {
          orgName: formData.orgName,
          dateOfJoining: formData.dateOfJoining,
          remark: formData.remark,
        },
      ],
    };

    try {
      await createEmployeeAPI(payload);
      alert("Employee created successfully");
      navigate("/org/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create employee");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
        <h2>Add Employee</h2>

        <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
          <input
            name="empName"
            placeholder="Employee Name"
            onChange={handleChange}
            required
          />
          <input
            name="mobileNumber"
            placeholder="Mobile Number"
            onChange={handleChange}
          />
          <input
            name="aadhaarNumber"
            placeholder="Aadhaar Number"
            onChange={handleChange}
          />
          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            name="orgName"
            placeholder="Organization Name"
            onChange={handleChange}
            required
          />
          <input
            name="dateOfJoining"
            type="date"
            onChange={handleChange}
            required
          />
          <input
            name="remark"
            placeholder="Remark"
            onChange={handleChange}
          />

          <button type="submit" style={{ marginTop: "10px" }}>
            Create Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
