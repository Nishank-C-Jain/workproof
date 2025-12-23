import { useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar.jsx";
import SearchBar from "../../components/common/SearchBar.jsx";
import EmployeeList from "../../components/org/EmployeeList.jsx";
import {
  getEmployeesByOrgAPI,
  searchEmployeeAPI,
} from "../../api/employee.api.js";

const OrgDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState("");

  const orgName = "ABC pvt.ltd"; // later from org profile / token

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (searchText) {
      handleSearch(searchText);
    } else {
      fetchEmployees();
    }
  }, [searchText]);

  const fetchEmployees = async () => {
  const res = await getEmployeesByOrgAPI(orgName);
  setEmployees(res.data.employees);
};

  const handleSearch = async (text) => {
  const res = await searchEmployeeAPI({ name: text, org: orgName });
  setEmployees(res.data);
};

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "220px", width: "100%" }}>
        <h1>welcome to {orgName}</h1>
        <h2>Organization Dashboard</h2>
        <SearchBar onSearch={setSearchText} />
        <EmployeeList employees={employees} />
      </div>
    </div>
    
  );
};

export default OrgDashboard;