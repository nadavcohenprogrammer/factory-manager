// user.js (Updated to include company reference and permissions)
const mongoose = require("mongoose");
const Department = require("./department.model");

const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyRole: {
      type: String,
      enum: ["Employee", "Company-Manager", "System-Manager"],
      default: "Employee",
    },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },

    isAdmin: { type: Boolean, required: true, default: false },

    departments: [{
      department: { type: Schema.Types.ObjectId, ref: "Department" },
      permission: { departments: [{
        department: { type: Schema.Types.ObjectId, ref: 'Department' },
        permission: {
          type: String,
          enum: ['view', 'edit', 'delete']
        }
      }],
        type: String,
        enum: ["view", "edit", "delete"]
      }
    }],
   
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    isActive: { type: Boolean, required: true, default: true },
    phoneNumber: { type: String },
    salt: { type: String, required: true },
    numOfActions: {
      type: Number,
      default: function () {
        switch (this.role) {
          case "user":
            return 5;
          case "admin":
            return 10;
          case "superadmin":
            return 100000;
          default:
            return 5;
        }
      },
    },
    currentActions: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    lastLogin: Date,
    company: [{ type: Schema.Types.ObjectId, ref: "Company" }], // Reference to company
    permissions: [
      {
        type: String,
        enum: ["block","view", "edit"],
        default: function () {
          switch (this.role) {
            case "admin":
              return "edit";
            case "superAdmin":
              return "edit";
            default:
              return "block";
          }
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

// import bcrypt from "bcryptjs";
// import mongoose, { Schema } from "mongoose";

// const userSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     title: { type: String, required: true },
//     role: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     isAdmin: { type: Boolean, required: true, default: false },
//     tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
//     isActive: { type: Boolean, required: true, default: true },
//   },
//   { timestamps: true }
// );

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model("User", userSchema);

// export default User;
