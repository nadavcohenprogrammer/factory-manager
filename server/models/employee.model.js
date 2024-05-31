const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  startWorkYear: { type: Date, default: Date.now },
  isWorkManager: { type: Boolean, default: false },
  department: { type: Schema.Types.ObjectId, ref: "Department" },
  // shifts: [{ type: Schema.Types.ObjectId, ref: "Shift" }],
});
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;



// return (
//   <div className="">
//     <h1 className="text-2xl font-semibold mb-4">Edit Department</h1>
//     <form>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//           Name
//         </label>
//         <input
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           id="name"
//           type="text"
//           placeholder="Department Name"
//           value={department.name || ""}
//           onChange={(e) => setDepartment({ ...department, name: e.target.value })}
//         />
//       </div>
//       {/* Add more form fields for editing department data */}
//       <button
//         type="button"
//         onClick={handleUpdate}
//         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
//       >
//         Update
//       </button>
//       <button
//         type="button"
//         onClick={handleDelete}
//         className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
//       >
//         Delete
//       </button>
//     </form>
//     <div>
//       <h2>Add Employee to Department</h2>
//       <select
//         className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
//         value={selectedEmployee}
//         onChange={(e) => setSelectedEmployee(e.target.value)}
//       >
//         <option value="">Select Employee</option>
//         {employees.map((employee) => (
//           <option key={employee.id} value={employee.id}>
//             {employee.firstName} - {employee.lastName}
//           </option>
//         ))}
//       </select>
//       {/* <select
//         className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
//         value={selectedEmployee}
//         onChange={(e) => setSelectedEmployee(e.target.value)}
//       >
//         <option value="">Select Employee</option>
//         {employees.map((employee) => (
//           <option key={employee.id} value={employee.id}>
//             {employee.fullName}
//           </option>
//         ))}
//       </select> */}
//       <button
//         type="button"
//         onClick={handleAddEmployee}
//         className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2"
//       >
//         Add
//       </button>
//     </div>
//   </div>
// );