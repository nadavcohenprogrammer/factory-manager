/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import DocumentItem from './DocumentItem';

const DocumentList = ({ documents }) => {
  return (
    <div className="bg-white shadow-md rounded">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Type</th>
            <th className="py-2">Size</th>
            <th className="py-2">Upload Date</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <DocumentItem key={doc._id} document={doc} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentList;
