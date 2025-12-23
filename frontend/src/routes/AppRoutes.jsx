import { Routes, Route } from "react-router-dom";
import SelectRole from "../pages/auth/selectRole.jsx";
import OrgLogin from "../pages/auth/org/orgLogin.jsx";
import OrgRegister from "../pages/auth/org/orgRegister.jsx";
import EmployeeLogin from "../pages/auth/emp/employeeLogin.jsx";
import EmployeeRegister from "../pages/auth/emp/employeeRegister.jsx";
import EmployeeProfile from "../pages/employee/employeeProfile.jsx";
import OrgDashboard from "../pages/org/OrgDashboard.jsx";
import OrgProfile from "../pages/org/OrgProfile.jsx";
import ProtectedRoute from "../auth/ProtectedRoute.jsx"; 



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SelectRole />} />

      {/* ORG */}
      <Route path="/org/login" element={<OrgLogin />} />
      <Route path="/org/register" element={<OrgRegister />} />
      <Route path="/org/dashboard" element={<OrgDashboard />} />
      <Route path="/org/profile" element={<ProtectedRoute allowedRole="Admin"> <OrgProfile /></ProtectedRoute>}/>
 
      {/* EMPLOYEE */}
      <Route path="/employee/login" element={<EmployeeLogin />} />
      <Route path="/employee/profile/:id" element={<EmployeeProfile />} />
      <Route path="/employee/register" element={<EmployeeRegister />} />
      
    </Routes>
    
  );
};

export default AppRoutes;
