/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const TaskModal = ({ task, onClose }) => {
    if (!task) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">{task.title}</h2>
                <p className="mb-2"><strong>Assignee:</strong> {task.assignee}</p>
                <p className="mb-2"><strong>Due Date:</strong> {task.dueDate}</p>
                <p className={`mb-4 text-sm font-semibold ${task.status === 'Complete' ? 'text-green-800' : 'text-yellow-800'}`}>
                    <strong>Status:</strong> {task.status}
                </p>
                <button onClick={onClose} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Close</button>
            </div>
        </div>
    );
};

export default TaskModal;
