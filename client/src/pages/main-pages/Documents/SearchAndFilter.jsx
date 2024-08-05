/* eslint-disable no-unused-vars */
import React from 'react';

const SearchAndFilter = () => {
  return (
    <div className="mb-4 flex justify-between">
      <input
        type="text"
        className="border border-gray-300 p-2 rounded w-2/3"
        placeholder="Search documents..."
      />
      <select className="border border-gray-300 p-2 rounded">
        <option value="date">Sort by Date</option>
        <option value="name">Sort by Name</option>
        <option value="type">Sort by Type</option>
      </select>
    </div>
  );
};

export default SearchAndFilter;
