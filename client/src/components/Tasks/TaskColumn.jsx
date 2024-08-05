// import React, { useState } from 'react';
// import TaskColumn from './TaskColumn';

// const TaskBoard = () => {
//     const [columns, setColumns] = useState([
//         { id: 1, name: 'To Do', tasks: [{ id: 1, title: 'Task 1', assignee: 'John Doe', dueDate: '2024-08-01', status: 'Incomplete' }] },
//         { id: 2, name: 'In Progress', tasks: [{ id: 2, title: 'Task 2', assignee: 'Jane Doe', dueDate: '2024-08-03', status: 'Incomplete' }] },
//         { id: 3, name: 'Done', tasks: [{ id: 3, title: 'Task 3', assignee: 'Alice', dueDate: '2024-08-05', status: 'Complete' }] },
//     ]);

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
//             {columns.map(column => (
//                 <TaskColumn key={column.id} column={column} />
//             ))}
//         </div>
//     );
// };

// export default TaskBoard;