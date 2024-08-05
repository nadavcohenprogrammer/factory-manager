/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function ConfirmMessage({ onDialog, message }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded-lg shadow-lg w-96 text-center">
        <div className="text-gray-700 mb-4">{message}</div>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600"
            onClick={() => onDialog(true)}
          >
            OK
          </button>
          <button
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600"
            onClick={() => onDialog(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmMessage;
