/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../UserContext'
import { useNavigate, useParams } from "react-router-dom"
import { deleteData, fetchData, postData } from "../../services/utils";


function EditDepartmentPage() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate();
  const { id } = useParams();
  const [departmentName, setDepartmentName] = useState('');
  const [managerId, setManagerId] = useState('');
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([""]);
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    const importData = async () => {
      try {
        const department = await fetchData(`/departments/department/${id}`);
        setDepartment(department);
        setDepartmentName(department.name);
        const employeesData = await fetchData(`/employees/employees/${department._id}`);
        setEmployees(employeesData)
      } catch (err) {
        console.log("There was an error with the request.");
      }
    }
    importData();
  }, [])

  // useEffect(() => {
  //   const refreshData = async () => {
  //     let allShifts = [];
  //     let allEmployees = [];
  //     const departmentsData = await fetchData(`/companies/company/departments/${user.chosenCompany}`);
  //     setDepartments(departmentsData.department);
  //     for (const department of departmentsData.department) {
  //       const shiftsData = await fetchData(`/shifts/shifts/${department._id}`);
  //       allShifts = [...allShifts, ...shiftsData];
  //       const employeesData = await fetchData(`/employees/employees/${department._id}`);
  //       allEmployees = [...allEmployees, ...employeesData];
  //     }
  //     setShifts(allShifts);
  //     setEmployees(allEmployees);
  //   }
  //   if (user)
  //     refreshData()
  // }, [user]);

  const handleSaveDepartment = async () => {
    try {
      if (!managerId) {
        await postData(`/departments/edit-department/${id}`, { departmentName });
        navigate(`/departments/${user.chosenCompany._id.toString()}`);
      } else {
        await postData(`/departments/edit-department/${id}`, { departmentName, managerId });
        navigate(`/departments/${user.chosenCompany._id.toString()}`);
      }
      if (selectedEmployees) {
        await postData(`/employees/add-employees/${id}`, { selectedEmployees });

      }
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  const handleDeleteDepartment = async () => {
    try {
      await deleteData(`/departments/delete-department/${id}`);
      navigate(`/departments/${user.chosenCompany._id.toString()}`);
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const handleCancel = () =>
    navigate(`/departments/${user.chosenCompany._id.toString()}`);

  const handleSelectManager = (event) => {
    const managerId = event.target.value;
    setManagerId(managerId);
  }
  const handleSelectEmployees = (event) => {
    const selected = event.target.value;
    const employee = employees.find(emp => emp._id === selected);
    if (employee.department._id === id) {
      alert(`${employee.firstName}-${employee.lastName} already belongs to this department`);
    } else if (employee.department._id !== id) {
      alert(`${employee.firstName}-${employee.lastName} are not belongs to this department `);
      // setSelectedEmployees([...selectedEmployees, selected]);
    }
    setSelectedEmployees(...selectedEmployees, selected);
    event.target.value = "";
  }

  const handleRemoveEmployeeFromList = (event) => {
    const selected = event.target.value;
    const emploteesSelected = selectedEmployees.filter(emp => emp !== selected);
    setSelectedEmployees(emploteesSelected);
  }


  return (
    <div className="max-w-4xl mx-80 mt-8 p-6 bg-white rounded-lg shadow-2xl">
      <h1 className="text-2xl font-semibold mb-4">Edit {departmentName} </h1>
      <form>
        <label>Name</label>
        <div className="mb-4">
          <input
            className=" font-semibold"
            id="department-name"
            type="text"
            placeholder="Department Name"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          />
          <label>{department.manager ? "Change Manager" : "Set Manager"}</label>
          <select
            id="employeeList"
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
            onChange={handleSelectManager}
          >
            <option value="">{department.manager?.firstName}-{department.manager?.lastName}</option>
            {employees && employees.map((employee) => (
              <option key={employee._id} value={employee._id}>{employee.firstName}- {employee.lastName}</option>
            ))}
          </select>

          <select
            id="employeeList"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={handleSelectEmployees}
          >
            <option value="">Add Employees to this Department</option>
            {employees && employees.map((employee) => (
              <option key={employee._id} value={employee._id}>{employee.firstName}- {employee.lastName}</option>
            ))}
          </select>
          <ul className="mt-4">
            {employees.map(employee =>
            (selectedEmployees === employee._id && (
              <li
                className="list-disc list-inside text-center mb-2 flex justify-center items-center"
                key={employee._id}>
                <span
                  className="inline-block bg-blue-200 text-blue-800 font-bold px-3 py-1 rounded-full">
                  {employee.firstName} - {employee.lastName}</span>
                <button
                  className=" ml-6 p-1 bg-red-500 hover:bg-red-600 text-white rounded transition duration-300 flex items-center justify-center"
                  onClick={() => handleRemoveEmployeeFromList(employee._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            ))
            )}
          </ul>


        </div>
        {/* Add more form fields for department data, e.g., manager */}
        <button
          type="button"
          onClick={handleSaveDepartment}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleDeleteDepartment}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditDepartmentPage;
