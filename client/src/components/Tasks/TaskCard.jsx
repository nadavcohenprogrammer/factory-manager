/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const TaskCard = ({ task }) => {
    return (
        <div className="bg-white border border-gray-300 rounded-md shadow-md p-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
            <p className="text-gray-600">Assignee: {task.assignee}</p>
            <p className="text-gray-600">Due Date: {task.dueDate}</p>
            <p className={`text-sm font-semibold ${task.status === 'Complete' ? 'text-green-800' : 'text-yellow-800'}`}>
                Status: {task.status}
            </p>
            <div className="mt-2">
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="ml-2 text-red-500 hover:underline">Delete</button>
            </div>
        </div>
    );
};

export default TaskCard;
