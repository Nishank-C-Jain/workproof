import Organization from "../models/org.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Route 1: Create Organization
export const createOrganization = async (req, res) => {
  try {
    const { orgName, orgType, description, password } = req.body;

    if (!orgName || !orgType || !password) {
      return res.status(400).json({
        message: "orgName, orgType and password are required"
      });
    }

    const exists = await Organization.findOne({ orgName });
    if (exists) {
      return res.status(400).json({
        message: "Organization already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const organization = await Organization.create({
      orgName,
      orgType,
      description,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Organization created successfully",
      organization
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//   Route 2: LOGIN ORGANIZATION
export const loginOrganization = async (req, res) => {
  try {
    const { orgName, password } = req.body;

    if (!orgName || !password) {
      return res.status(400).json({
        message: "orgName and password are required"
      });
    }
    const organization = await Organization.findOne({ orgName });
    if (!organization) {
      return res.status(404).json({
        message: "Organization not found"
      });
    }

    const isMatch = await bcrypt.compare(password, organization.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    //  CREATE JWT TOKEN HERE (ORG LOGIN)
    const token = jwt.sign(
      {
        id: organization._id,
        role: "Admin",
        orgName: organization.orgName
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      message: "Organization login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Route 3: GET ORGANIZATION PROFILE BY ID
export const getOrganizationByIdProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const organization = await Organization.findById(id).select("-password");

    if (!organization) {
      return res.status(404).json({
        message: "Organization not found"
      });
    }

    res.status(200).json({
      message: "Organization fetched successfully",
      organization
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

