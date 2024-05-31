const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const departmentSchema = Schema({
  name: { type: String, required: true },
  manager: { type: Schema.Types.ObjectId, ref: "Employee" }, 
});
const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
