/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../UserContext";
import { fetchData } from "../../services/utils";


function NewDepartmentPage({ direct, handleForm }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [departmentName, setDepartmentName] = useState('');
  const [managerId, setManagerId] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const importData = async () => {
      try {
        const departmentsData = await fetchData(`/companies/company/departments/${user.chosenCompany._id.toString()}`);
        for (const department of departmentsData.department) {
          const employeesData = await fetchData(`/employees/employees/${department._id}`);
          setEmployees([...employeesData]);

        }
      } catch (err) {
        console.error(err, "There was an error with the request.")
      }
    }
    if (user)
    importData();
  }, [user])

  const handleSaveDepartment = async () => {
    try {
      if (!managerId) {
        const { data } = await axios.post("/departments/add-department", { departmentName });
        await axios.post(`/companies/add-department/${user.chosenCompany._id.toString()}`, { department: data._id });
        if (direct) {
          handleForm(false)
          navigate(`/departments/${user.chosenCompany._id.toString()}`)
        } else
        navigate(`/departments/${user.chosenCompany._id.toString()}`)
      } else {
        const { data } = await axios.post("/departments/add-department", { departmentName, managerId });
        await axios.post(`/companies/add-department/${user.chosenCompany._id.toString()}`, { department: data._id });
        if (direct) {
          handleForm(false)
          navigate(`/departments/${user.chosenCompany._id.toString()}`)
        } else {
          if (direct) {
            handleForm(false)
            navigate(`/departments/${user.chosenCompany._id.toString()}`)
          } else
          navigate(`/departments/${user.chosenCompany._id.toString()}`)
        }

      }
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  const handleCancel = () => {
    if (direct) {
      handleForm(false)
      navigate(`/departments/${user.chosenCompany._id.toString()}`)
    } else
      navigate(`/departments/${user.chosenCompany._id.toString()}`)
  };

  const handleSelectManager = (event) => {
    const managerId = event.target.value;
    setManagerId(managerId);
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-semibold mb-4">New Department</h1>
      <form>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="department-name"
            type="text"
            placeholder="Department Name"
            value={departmentName.name}
            onChange={(e) => setDepartmentName(e.target.value)}
          />
          <select
            id="employeeList"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={handleSelectManager}
          >
            <option value="">Select manager from  employee list</option>
            {employees && employees.map((employee) => (
              <option key={employee._id} value={employee._id}>{employee.firstName}</option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={handleSaveDepartment}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Save
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

export default NewDepartmentPage;
