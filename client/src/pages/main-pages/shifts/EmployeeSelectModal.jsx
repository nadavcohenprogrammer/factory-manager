/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const EmployeeSelectModal = ({ employees, handleSelectEmployee, setShowSelect }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div className="bg-white p-4 rounded-lg shadow-lg w-96">
      <h3 className="text-xl font-semibold mb-4">Add Employee to Shift</h3>
      <label className="text-gray-700">Select Employee:</label>
      <select
        className="border border-gray-300 rounded-md p-2 w-full mb-4"
        onChange={handleSelectEmployee}
      >
        <option value="">Select Employee</option>
        {employees.map((employee) => (
          <option key={employee._id} value={employee._id}>{employee.firstName} {employee.lastName}</option>
        ))}
      </select>
      <button
        className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 mr-2"
        onClick={() => setShowSelect(false)}
      >
        Cancel
      </button>
    </div>
  </div>
);

export default EmployeeSelectModal;