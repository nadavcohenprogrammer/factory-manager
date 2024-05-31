/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import { fetchData, postData } from "../../services/utils"
import ConfirmMessage from "../../confirm-messagePage";
import SidebarItem from "../../components/Sidebar/SidebarItem";

function ShiftsPage() {
  const { user } = useContext(UserContext);
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showSelect, setShowSelect] = useState(false)
  const [shiftBar, setShiftBar] = useState(false)
  const [selectedShift, setSelectedShift] = useState('')
  const [selectDepartmen, setSelectDepartmen] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [newShift, setNewShift] = useState({ date: "", startingHour: "", endingHour: "" });
  const [dialog, setDialog] = useState({ message: "", isLoading: false, handleCancel: false });



  useEffect(() => {
    const refreshData = async () => {
      let allShifts = [];
      let allEmployees = [];
      const departmentsData = await fetchData(`/companies/company/departments/${user.chosenCompany._id.toString()}`);
      setDepartments(departmentsData.department);
      for (const department of departmentsData.department) {
        const shiftsData = await fetchData(`/shifts/shifts/${department._id}`);
        allShifts = [...allShifts, ...shiftsData];
        const employeesData = await fetchData(`/employees/employees/${department._id}`);
        allEmployees = [...allEmployees, ...employeesData];
      }
      setShifts(allShifts);
      setEmployees(allEmployees);
    }
    if (user)
      refreshData()
  }, [user]);



  const refreshShifts = async () => {
    let allShifts = [];
    let allEmployees = [];
    for (const department of departments) {
      const shiftsData = await fetchData(`/shifts/shifts/${department._id}`);
      allShifts = [...allShifts, ...shiftsData];
      const employeesData = await fetchData(`/employees/employees/${department._id}`);
      allEmployees = [...allEmployees, ...employeesData];
    }
    setShifts(allShifts);
    setEmployees(allEmployees);
  }


  const refreshEmployees = async () => {
    for (const department of departments) {
      try {
        const employeesData = await fetchData(`/employees/employees/${selectDepartmen}`);
        setEmployees((prevEmployees) => [...prevEmployees, ...employeesData]);
      } catch (error) {
        console.error(`Error fetching data for department ${department._id}:`, error);
      }
    }
  }

  const handleDialog = (message, isLoading, handleCancel) => {
    setDialog({
      message,
      isLoading,
      handleCancel,
    });
  };

  const handleConfirmation = (choose) => {
    if (choose && dialog.handleCancel) {
      handleAddEmployeeAndDepartment();
      handleDialog("", false, false);
      setShowSelect(!showSelect)
      return;

    } else {
      handleDialog("", false, false);
      setShowSelect(!showSelect)
      return;
    }
  }


  const handleCreateShift = async () => {
    try {
      if (!selectDepartmen) {
        handleDialog("Please select a department", true, false);
        return;
      } else if (!newShift.date || !newShift.endingHour || !newShift.startingHour) {
        handleDialog("Please fill out all shift details", true, false);
        return;
      }
      await postData("/shifts/add-shift", { selectDepartmen, newShift });
      refreshShifts();
      handleDialog("Shift Created Successfully. now you can add employees", true, false);
      setSelectDepartmen('')
      setNewShift({ date: "", startingHour: "", endingHour: "" });
    } catch (error) {
      handleDialog("Failed to create shift. Please try again.", true, false);
      console.error("Error creating shift:", error);
    }
  };


  const handleAddEmployeeAndDepartment = async () => {
    try {
      await postData(`/employees/add-department/${selectedShift.department._id}`, { employeeId });
      await postData(`/shifts/add-employee/${selectedShift._id.toString()}`, { employeeId });
      refreshShifts();
      
    } catch (error) {
      console.error("Error adding employee and department:", error);
    }
  }

  const handleSelectEmployee = (event) => {
    const employeeId = event.target.value;
    setEmployeeId(employeeId);
    try {
      const employeeAssignToShift = selectedShift.employees?.find(employee => employee._id === employeeId);
      const employee = employees.find(emp => emp._id === employeeId);
      if (employeeAssignToShift) {
        const message = `${employee.firstName} has already been assigned to this shift.`;
        handleDialog(message, true, false)
        return;
      }
      else if (employee.department._id.toString() !== selectedShift.department._id.toString()) {
        console.log(employee.department._id.toString(), selectedShift.department._id.toString())
        const message = (
          <div className="text-center">
            <strong className="text-xl">{employee.firstName} - {employee.lastName}</strong> <br />
            <strong className="underline text-red-500 text-lg">is not part of the<br /></strong> <strong>{selectedShift.department.name}</strong> for this shift. <br />
            By clicking OK,<br /><strong className="underline text-red-500 text-lg"> all his shift data will be deleted.</strong>

          </div>

        );

        handleDialog(message, true, true);
        return;
      }
      else {
        console.log(employee.department._id.toString(), selectedShift.department._id.toString())
        handleDialog(`${employee.firstName} - ${employee.lastName} added successfully`, true, true);
        return;
      }
    } catch (error) {
      console.error("Error adding  employee to shift:", error);
      setShowSelect(false);
    }
  };

  const handleAddEmployee = (shiftId) => {
    console.log(shiftId)
    setSelectedShift(shiftId)
    setShowSelect(!showSelect)
  }

  const handleSelectDepartment = (event) => {
    const departmentId = event.target.value;
    setSelectDepartmen(departmentId);
  }

  const openCreatShiftBar = () => {
    if (departments.length <= 0) {
      alert("No departments available. Please creat departments first.");
      setShiftBar(false);
    } else setShiftBar(!shiftBar);
  }

  return (
    <div className="flex ">
      <SidebarItem />
      <div className="flex-grow">
        <div className="container mx-auto mt-8 ">
          <h1 className="text-3xl text-center font-bold mb-4">Shifts</h1>
          <h2 className="p-2 bg-white hover:bg-slate-400 border-2 rounded-lg w-2/5 m-auto  text-lg font-semibold  text-center cursor-pointer"
            onClick={openCreatShiftBar}>Create New Shift</h2>
          <div className="mb-8 p-2 bg-white shadow-2xl rounded-lg w-3/5 m-auto ">
            {shiftBar ? <form className="flex flex-col space-y-2 ">
              <label className="text-gray-700">Department:</label>
              <select
                id="departmentsList"
                className="border border-gray-300 rounded-md p-2 w-full"
                onChange={handleSelectDepartment}
              >
                <option value="">Select a department to add a shift</option>
                {departments && departments.map((department) => (
                  <option key={department._id} value={department._id}>{department.name}</option>
                ))}
              </select>
              <label className="text-gray-700">Date:</label>
              <input
                type="date"
                value={newShift.date}
                onChange={(e) => setNewShift({ ...newShift, date: e.target.value })}
                className="border border-gray-300 rounded-md p-2"
              />
              <label className="text-gray-700">Starting Hour:</label>
              <input
                type="time"
                value={newShift.startingHour}
                onChange={(e) => setNewShift({ ...newShift, startingHour: e.target.value })}
                className="border border-gray-300 rounded-md p-2"
              />
              <label className="text-gray-700">Ending Hour:</label>
              <input
                type="time"
                value={newShift.endingHour}
                onChange={(e) => setNewShift({ ...newShift, endingHour: e.target.value })}
                className="border border-gray-300 rounded-md p-2"
              />
              <button
                type="button"
                onClick={handleCreateShift}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Create Shift
              </button>
            </form> : null}
          </div>
          {/* {confirmationVisible && (
        <ConfirmMessage setConfirm={setConfirm} confirm={false} setConfirmationVisible={setConfirmationVisible} message={message} />
      )} */}


          <div className="pb-8">
            <h2 className="rounded-md border w-fit p-1 text-lg font-semibold">Existing Shifts</h2>
            <table className="min-w-full">
              <thead >
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border border-gray-300">Department</th>
                  <th className="py-2 px-4 border border-gray-300">Date</th>
                  <th className="py-2 px-4 border border-gray-300">Starting Hour</th>
                  <th className="py-2 px-4 border border-gray-300">Ending Hour</th>
                  <th className="py-2 px-4 border border-gray-300">Employees</th>
                  <th className="py-2 px-4 border border-gray-300">Add Employee</th>
                </tr>
              </thead>
              <tbody>
                {shifts.map((shift) => (
                  <tr key={shift._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border border-gray-300">
                      {shift.department?.name}
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                      {shift.date}
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                      {shift.startingHour}
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                      {shift.endingHour}
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                      <ul>
                        {shift.employees && shift.employees.map(employee => (
                          <li
                            className="list-disc list-inside"
                            key={employee._id}>{employee.firstName}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 w-full"
                        type='button' onClick={() => handleAddEmployee(shift)}> +add employee</button>
                      {showSelect && selectedShift._id === shift._id && <div className="mb-4">
                        {/* <label htmlFor="employeeList" className="text-gray-700">Select Employee:</label> */}
                        <select
                          id="employeeList"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          onChange={handleSelectEmployee}
                        >
                          <option value="">add employee to shift</option>
                          {employees.map(employee => (
                            <option key={employee._id} value={employee._id}>{employee.firstName} {employee.lastName}</option>
                          ))}
                        </select>
                      </div>}

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {dialog.isLoading && (
              <ConfirmMessage
                onConfirm={handleConfirmation}
                message={dialog.message}
                confirm={dialog.handleCancel} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShiftsPage;
