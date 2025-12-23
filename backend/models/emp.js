import mongoose from "mongoose";

// Sub-schema for organization history
const orgHistorySchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      required: true,
    },
    dateOfJoining: {
      type: Date,
      required: true,
    },
    dateOfLeaving: {
      type: Date,
    },
    remark: {
      type: String,
    },
  },
  { _id: false } // prevents auto _id for each history object
);

// Main Employee Schema
const employeeSchema = new mongoose.Schema(
  {
    empName: {
      type: String,
      required: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      unique: true,
    },

    aadhaarNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    address: {
      type: String,
    },

    role: {
      type: String,
      enum: ['emp','org'],
      default: "emp",
    },

    password: {
      type: String,
      required: true,
    },

    currentOrg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },

    orgHistory: {
      type: [orgHistorySchema], // array of single-unit objects
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Employee", employeeSchema);
