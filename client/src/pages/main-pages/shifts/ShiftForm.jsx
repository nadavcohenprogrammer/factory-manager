/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const ShiftForm = ({ departments, 
    newShift, 
    setNewShift, 
    handleCreateShift, 
    openCreateShiftBar, 
    shiftBar, 
    handleSelectDepartment 
}) => (
  <div>
    <h2
      className="p-2 mb-2 bg-slate-200 hover:bg-slate-400 border-2 rounded-lg w-2/5 m-auto text-lg font-semibold text-center cursor-pointer"
      onClick={openCreateShiftBar}
    >
      Create New Shift
    </h2>
    {shiftBar && (
      <div className="mb-8 p-2 bg-white shadow-2xl rounded-lg w-full lg:w-3/5 m-auto">
        <form className="flex flex-col space-y-2">
          <label className="text-gray-700">Department:</label>
          <select
            id="departmentsList"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={handleSelectDepartment}
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>{department.name}</option>
            ))}
          </select>
          <label className="text-gray-700">Date:</label>
          <input
            type="date"
            id="date"
            className="border border-gray-300 rounded-md p-2"
            value={newShift.date}
            onChange={(e) => setNewShift({ ...newShift, date: e.target.value })}
          />
          <label className="text-gray-700">Starting Hour:</label>
          <input
            type="time"
            id="startingHour"
            className="border border-gray-300 rounded-md p-2"
            value={newShift.startingHour}
            onChange={(e) => setNewShift({ ...newShift, startingHour: e.target.value })}
          />
          <label className="text-gray-700">Ending Hour:</label>
          <input
            type="time"
            id="endingHour"
            className="border border-gray-300 rounded-md p-2"
            value={newShift.endingHour}
            onChange={(e) => setNewShift({ ...newShift, endingHour: e.target.value })}
          />
          <button
            type="button"
            onClick={handleCreateShift}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Create Shift
          </button>
        </form>
      </div>
    )}
  </div>
);

export default ShiftForm;