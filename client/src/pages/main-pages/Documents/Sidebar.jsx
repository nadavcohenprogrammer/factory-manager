/* eslint-disable no-unused-vars */
import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-1/4 h-screen bg-gray-100 p-4">
      <h2 className="text-lg font-semibold mb-4">Navigation</h2>
      <ul>
        <li className="mb-2"><a href="#" className="text-blue-500">All Documents</a></li>
        <li className="mb-2"><a href="#" className="text-blue-500">Shared with Me</a></li>
        <li className="mb-2"><a href="#" className="text-blue-500">Recent Documents</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
