/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../UserContext'
import { useParams, useNavigate} from 'react-router-dom';

import axios from 'axios';
import { deleteData, fetchData, postData } from "../../services/utils"


function EditEmployeePage() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext)
    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    const [shifts, setShifts] = useState([]);
    const [updatedEmployee, setUpdatedEmployee] = useState({firstName: '', lastName: ''});
    const [selectedShift, setSelectedShift] = useState('');
    const { employeeId } = useParams();


    useEffect(() => {
        const importData = async () => {
            try {
                const employee = await fetchData(`/employees/employee/${employeeId}`);
                setEmployee(employee);
                setUpdatedEmployee({firstName: employee.firstName, lastName: employee.lastName});
                const departementId = employee.department?._id;
                if (departementId) {
                    const shifts = await fetchData(`/shifts/shifts/${departementId}`);
                    setShifts(shifts)
                }
            } catch (error) {
                console.error("Error finding employee :", error);
            }
        }
        importData()
    }, []);
    // const refreshShifts = async () => {
    //     const departementId = employee.department._id;
    //     const shifts = await fetchData(`/shifts/shifts/${departementId}`);
    //     setShifts(shifts);
    // }
    // const refreshDepartments = async () => {
    //     const departments = await fetchData("/departments/departments");
    //     setDepartments(departments);
    // }
    // const refreshEmployees = async () => {
    //     const { employeeId } = useParams();
    //     const employee = await fetchData(`/employees/employee/${employeeId}`);
    //     setEmployee(employee);
    // }

    const handleUpdateEmployee = async () => {
        await postData(`/employees/edit-employee/${employeeId}`, updatedEmployee);
       navigate(`/employees/${user.chosenCompany}`);
    };

    const handleDeleteEmployee = async () => {
        // Delete employee data
        await deleteData(`/employees/delete-employee/${employeeId}`)
        navigate(`/employees/${user.chosenCompany}`);
    };

    const handleRegisterToShift = () => {
        // Register employee to selected shift
        if (selectedShift) {
            // Update employee data with new shift
            const updatedEmployee = { shiftId: selectedShift };
            axios.post(`/api/employees/${id}`, updatedEmployee)
                .then(response => console.log('Employee updated:', response.data))
                .catch(error => console.error('Error updating employee:', error));
        }
    };

    const handleCancel = () => {
        navigate(`/employees/${user.chosenCompany}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">Edit {employee.firstName} - {employee.lastName}</h1>
            <div>
                <div className="flex items-center mb-4">
                    <form className="max-w-md mx-auto">
                        <label className="mr-4">First Name:</label>
                        <input
                            type='text'
                            value={updatedEmployee.firstName } 
                            onChange={(e) => setUpdatedEmployee({...updatedEmployee,firstName: e.target.value})} />
                        <label className="mr-4">Last Name:</label>
                        <input
                            type='text'
                            value={updatedEmployee.lastName} 
                            onChange={(e) => setUpdatedEmployee({...updatedEmployee,lastName: e.target.value})} />
                     
                        <button type="button"
                            onClick={handleUpdateEmployee}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                                Update</button>
                        <button type="button"
                            onClick={handleDeleteEmployee}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded  mr-2">
                                Delete</button>
                        <button type="button"
                            onClick={handleCancel}
                            className="bg-gray-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                Cancel</button>
                    </form>
                </div>



                <h2 className="text-xl font-semibold mb-4">Shifts</h2>
                <select
                    className="mr-4 mb-2 px-2 py-1 border border-gray-300 rounded"
                    onChange={(e) => setSelectedShift(e.target.value)}
                >
                    <option value="">Select a Shift</option>
                    {shifts.map(shift => (
                        <option key={shift._id} value={shift._id}>{shift.date} </option>
                    ))}
                </select>

                <table className="w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border border-gray-300">Date</th>
                            <th className="py-2 px-4 border border-gray-300">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shifts.map(shift => (
                            <tr key={shift._id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border border-gray-300">{shift.date}</td>
                                <td className="py-2 px-4 border border-gray-300"> {shift.startingHour}-{shift.endingHour}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex items-center mb-4">

                    <button type="button" onClick={handleRegisterToShift} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Register to Shift</button>
                </div>
            </div>
        </div>
    );
}

export default EditEmployeePage;
