// company.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = Schema({
  name: { type: String, required: true },
  manager: [{ type: Schema.Types.ObjectId, ref: "User" }],
  logo: { type: String },
  department: [{ type: Schema.Types.ObjectId, ref: "Department" }],
  // permissions: [{
  //   type: String,
  //   enum: ['view', 'edit', 'delete'],
  //   default: 'view'
  // }],
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
