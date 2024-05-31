const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const actionsSchema = Schema({
  name: { type: String, required: true },
  manager: { type: Schema.Types.ObjectId, ref: "Employee" }, 
  userId: [{ type: Schema.Types.ObjectId, ref: "User" }],
  timestamp: Date, 
});
const Action = mongoose.model("Action", actionsSchema);
module.exports = Action;
