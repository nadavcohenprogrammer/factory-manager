/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const TaskTable = ({ tasks }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="py-2 px-4 text-left text-gray-600">Task</th>
                        <th className="py-2 px-4 text-left text-gray-600">Assignee</th>
                        <th className="py-2 px-4 text-left text-gray-600">Due Date</th>
                        <th className="py-2 px-4 text-left text-gray-600">Status</th>
                        <th className="py-2 px-4 text-left text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id} className="border-b border-gray-200">
                            <td className="py-2 px-4 text-gray-800">{task.title}</td>
                            <td className="py-2 px-4 text-gray-800">{task.assignee}</td>
                            <td className="py-2 px-4 text-gray-800">{task.dueDate}</td>
                            <td className="py-2 px-4">
                                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${task.status === 'Complete' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                    {task.status}
                                </span>
                            </td>
                            <td className="py-2 px-4">
                                <button className="text-blue-500 hover:underline">Edit</button>
                                <button className="ml-2 text-red-500 hover:underline">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;
