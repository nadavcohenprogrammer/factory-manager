/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import DocumentList from './DocumentList';
import UploadModal from './UploadModal';
import Header from './Header';
import Sidebar from './Sidebar';
import SearchAndFilter from './SearchAndFilter';

const DocumentManagementPage = () => {
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Fetch documents from the backend
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const response = await fetch('/api/documents');
    const data = await response.json();
    setDocuments(data);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-3/4 p-4">
        <Header setModalOpen={setModalOpen} />
        <SearchAndFilter />
        <DocumentList documents={documents} />
        {isModalOpen && <UploadModal setModalOpen={setModalOpen} fetchDocuments={fetchDocuments} />}
      </div>
    </div>
  );
};

export default DocumentManagementPage;
