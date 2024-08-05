/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Header = ({ setModalOpen }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-semibold">Document Management</h1>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload New Document
      </button>
    </div>
  );
};

export default Header;
