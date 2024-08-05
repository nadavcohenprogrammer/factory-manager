/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const ShiftTable = ({ shifts, handleAddEmployee }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Department</th>
          <th className="py-2 px-4 border-b">Date</th>
          <th className="py-2 px-4 border-b">Starting Hour</th>
          <th className="py-2 px-4 border-b">Ending Hour</th>
          <th className="py-2 px-4 border-b">Employees</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {shifts.map((shift) => (
          <tr key={shift._id}>
            <td className="py-2 px-4 border-b text-center">{shift.department.name}</td>
            <td className="py-2 px-4 border-b text-center">{shift.date}</td>
            <td className="py-2 px-4 border-b text-center">{shift.startingHour}</td>
            <td className="py-2 px-4 border-b text-center">{shift.endingHour}</td>
            <td className="py-2 px-4 border-b text-center">
              <ul>
                {shift.employees?.map((employee) => (
                  <li key={employee._id}>{employee.firstName} {employee.lastName}</li>
                ))}
              </ul>
            </td>
            <td className="py-2 px-4 border-b text-center">
              <button
                className="bg-green-500 text-white font-semibold py-1 px-2 rounded-md hover:bg-green-600"
                onClick={() => handleAddEmployee(shift)}
              >
                Add Employee
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ShiftTable;