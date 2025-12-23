import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      required: true,
      unique: true
    },
    orgType: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "admin"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Organization", organizationSchema);
