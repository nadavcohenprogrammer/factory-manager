/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const ConfirmMessage = ({ message, onConfirm, confirm }) => {
   

    return (
        <div>
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
                <div className="bg-white border border-green-400 text-blue-600 rounded-xl shadow-lg p-6">
                    <p className="mb-4 text-base border-blue-800  font-medium">{message}</p>
                    <div className='justify-center flex'>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
                        onClick={() => onConfirm(true)}>OK
                    </button>
                    {confirm &&
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded ml-1"
                            onClick={() => onConfirm(false)}>Cancel
                        </button>
                    }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ConfirmMessage