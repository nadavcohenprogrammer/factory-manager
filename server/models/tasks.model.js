const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tasksSchema = Schema({
  date: { type: Date, default: Date.now },
  title: String,
  body: String,
  status: Boolean,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  employee: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
  department: { type: Schema.Types.ObjectId, ref: "Department" },

});
const Task = mongoose.model("Task", tasksSchema);
module.exports = Task;

