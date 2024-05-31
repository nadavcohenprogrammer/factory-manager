const express = require("express");
const router = express.Router();
const {
  creatNewEmployee,
  getEmployees,
  getEmployeesReleted,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  updateManyById,
  assignDepartmentToEmployee,
  // unassignDepartmentFromEmployee,
  // unassignDepartmentFromEmployees,
} = require("../services-BL/employee-service");
const { isAuthenticated, trackUserActions,isValidUpUserPermision } = require("../validations/user-validations");

router.get("/employees",isAuthenticated,trackUserActions, async (req, res) => {
  const employees = await getEmployees();
  res.json(employees);
});

router.get("/employees/:departmentId", async (req, res) => {
  const { departmentId } = req.params;
  const employees = await getEmployeesReleted(departmentId);
  res.json(employees);
});

router.get("/employee/:id", async (req, res) => {
  const { id } = req.params;
  const employee = await getEmployeeById(id);
  res.json(employee);
});

router.post("/edit-employee/:id",isValidUpUserPermision, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await updateEmployeeById(id, req.body);
    res.json({
      user,
      message: "User updated",
    });
  } catch (error) {
    serverErrorResponse(res);
  }
});

router.post("/edit-employees/:departmentId",isValidUpUserPermision, async (req, res) => {
  try {
    const { departmentId } = req.params;
    const user = await updateManyById(departmentId, req.body);
    res.json({
      message: "Users updated",
    });
  } catch (error) {
    serverErrorResponse(res);
  }
});

router.post("/add-department/:departmentId",isValidUpUserPermision, async (req, res) => {
  try {
    const { departmentId } = req.params;
    const { employeeId } = req.body;
     await assignDepartmentToEmployee(departmentId, employeeId);
    res.json({
      message: "Employee's department updated",
    });
  } catch (error) {
    serverErrorResponse(res);
  }
});

router.post("/delete-employee/:id",isValidUpUserPermision, async (req, res) => {
  const { id } = req.params;
  try {
    await deleteEmployeeById(id);
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    serverErrorResponse(res);
  }
});

router.post("/add-employee", async (req, res) => {
  try {
    await creatNewEmployee(req.body);
    res.json({
      message: "user created",
    });
  } catch (error) {
    serverErrorResponse(res);
  }
});

module.exports = router;


{/* <table className="w-full border-collapse border border-gray-300">
<thead>
  <tr className="h-16 text-left">
    <th className="font-bold text-gray-900 px-6 py-4">Full Name</th>
    <th className="font-bold text-gray-900 px-6 py-4">Department</th>
    <th className="font-bold text-gray-900 px-6 py-4">Shifts</th>
  </tr>
</thead>
<tbody>
  {filteredEmployees.map(employee => (
    <tr key={employee._id} className="h-14 text-gray-700 border-b">
      <td className="px-6 py-4">
        <Link to={`/edit-employee/${employee._id}`}
          className="text-blue-500 hover:underline">{employee.firstName} - {employee.lastName}</Link>
      </td>
      <td className="py-2 px-4 border border-gray-300">
        <Link to={`/edit-department/${employee.department?._id}`} className="text-blue-500 hover:underline">{employee.department && employee.department.name}</Link>
      </td>
      <td className="py-2 px-4 border border-gray-300">
        <ul>
          {shifts.map(shift => (shift.employees?.some(emp => emp._id === employee._id) && (
            <li className="list-disc list-inside text-center"
              key={shift._id}>{shift.date} <br /> {shift.startingHour} - {shift.endingHour}</li>
          )))}
        </ul>
      </td>
    </tr>
  ))}
</tbody>
</table> */}