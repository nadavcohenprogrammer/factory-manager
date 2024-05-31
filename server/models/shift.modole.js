const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shiftSchema = Schema({
  date: { type: String, required: true },
  startingHour: { type: String, required: true },
  endingHour: { type: String, required: true },
  employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
  department: { type: Schema.Types.ObjectId, ref: "Department", required: true },
});
const Shift = mongoose.model("Shift", shiftSchema);
module.exports = Shift;
