/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TaskTable from './TaskTable';
import TaskCard from './TaskCard';
import TaskSidebar from './Task-Sidebar';
import TaskModal from './TaskModal';

const initialTasks = [
    { id: 1, title: 'Task 1', assignee: 'John Doe', dueDate: '2024-08-01', status: 'Complete' },
    { id: 2, title: 'Task 2', assignee: 'Jane Smith', dueDate: '2024-08-05', status: 'Incomplete' },
    // Add more tasks here...
];

const TasksApp = () => {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState(initialTasks);
    const [selectedTask, setSelectedTask] = useState(null);
    const [filters, setFilters] = useState({ status: '', dueDate: '' });

    const handleFilterChange = (filterType, value) => {
        setFilters({ ...filters, [filterType]: value });
    };

    const filteredTasks = tasks.filter(task => {
        return (!filters.status || task.status === filters.status) &&
               (!filters.dueDate || task.dueDate === filters.dueDate);
    });

    return (
        <div className="flex h-screen">
            <TaskSidebar filters={filters} onFilterChange={handleFilterChange} />
            <div className="flex-1 p-6 overflow-auto">
                <h1 className="text-2xl font-bold mb-6">Task Manager</h1>
                <button onClick={()=>navigate('/')} 
                className='text-xl rounded-md p-1 mb-3 bg-blue-500'>Back</button>
                <TaskTable tasks={filteredTasks} />
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </div>
            {selectedTask && <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />}
        </div>
    );
};

export default TasksApp;
