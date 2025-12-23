import { useEffect, useState } from "react";
import { decodeToken } from "../../utils/decodeToken.js";
import { getOrgByIdAPI } from "../../api/org.api.js";


const OrgProfile = () => {
  const [org, setOrg] = useState(null);

  useEffect(() => {
    const decoded = decodeToken();
    if (decoded?.id) {
      fetchOrg(decoded.id);
    }
  }, []);

  const fetchOrg = async (orgId) => {
    const res = await getOrgByIdAPI(orgId);
    setOrg(res.data.org);
  };

  if (!org) return <p>Loading...</p>;

  return (
    <div>
      <h2>Organization Profile</h2>
      <p><b>Name:</b> {org.orgName}</p>
      <p><b>Email:</b> {org.email}</p>
      <p><b>Mobile:</b> {org.mobileNumber}</p>
      <p><b>Address:</b> {org.address}</p>
    </div>
  );
};

export default OrgProfile;
