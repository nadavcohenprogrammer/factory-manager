/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Sidebar = ({ filters, onFilterChange }) => {
    return (
        <div className="bg-gray-100 p-4 h-full w-64 border-r border-gray-300">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="mb-4">
                <h3 className="font-medium">Status</h3>
                <select onChange={(e) => onFilterChange('status', e.target.value)} className="block w-full mt-1 p-2 border border-gray-300 rounded-md">
                    <option value="">All</option>
                    <option value="Complete">Complete</option>
                    <option value="Incomplete">Incomplete</option>
                </select>
            </div>
            <div>
                <h3 className="font-medium">Due Date</h3>
                <input type="date" onChange={(e) => onFilterChange('dueDate', e.target.value)} className="block w-full mt-1 p-2 border border-gray-300 rounded-md" />
            </div>
        </div>
    );
};

export default Sidebar;
