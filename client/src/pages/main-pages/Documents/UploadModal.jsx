/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const UploadModal = ({ setModalOpen, fetchDocuments }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('file', file);

    await fetch('/documents', {
      method: 'POST',
      body: formData,
    });

    fetchDocuments();
    setModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl mb-4">Upload New Document</h2>
        <input
          type="text"
          placeholder="Document Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="text"
          placeholder="Document Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 mb-4 w-full"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Upload
        </button>
        <button
          onClick={() => setModalOpen(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UploadModal;
