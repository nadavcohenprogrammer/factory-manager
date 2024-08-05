/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const DocumentItem = ({ document }) => {
  return (
    <tr>
      <td className="py-2">{document.name}</td>
      <td className="py-2">{document.type}</td>
      <td className="py-2">{(document.size / 1024 / 1024).toFixed(2)} MB</td>
      <td className="py-2">{new Date(document.uploadDate).toLocaleDateString()}</td>
      <td className="py-2">
        <button className="text-blue-500">View</button>
        <button className="text-blue-500">Edit</button>
        <button className="text-red-500">Delete</button>
      </td>
    </tr>
  );
};

export default DocumentItem;
