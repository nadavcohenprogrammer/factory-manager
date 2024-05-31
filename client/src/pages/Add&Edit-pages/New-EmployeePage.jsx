/* eslint-disable no-unused-vars */
import React, { useEffect, useState,useContext } from 'react';
import { UserContext } from '../../UserContext'
import axios from 'axios';
import {useNavigate} from "react-router-dom"

function NewEmployeePage() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext)
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [selectDepartmen, setSelectDepartmen] = useState('')
    const [departments, setDepartments] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/companies/company/departments/${user.chosenCompany}`);
            setDepartments(data.department);
        }
        fetchData();
    }, [user]);

    const handleSaveEmployee = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/employees/add-employee', {
                firstName: fname,
                lastName: lname,
                departmentId: selectDepartmen
            })
            alert(`${fname}-${lname} is added, now you can assign him to a shift`)
            navigate('/employees');
        } catch (error) {
            alert(`Something went wrong, I couldn't add the ${fname}-${lname}`)
        }
    }

    const handleCancel = () => {
        // Redirect back to Employees page
        navigate('/employees');
    };

    const handleSelectDepartment = (event) => {
        const departmentId = event.target.value;
        setSelectDepartmen(departmentId);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4 text-center">New Employee</h1>
            <div className="flex items-center mb-4">
                <form className='max-w-md mx-auto' onSubmit={handleSaveEmployee}>
                    <input type='text' placeholder='John' value={fname} onChange={(e) => setFname(e.target.value)} />
                    <input type='text' placeholder='Doe' value={lname} onChange={(e) => setLname(e.target.value)} />
                    <select
                        id="departmentsList"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        onChange={handleSelectDepartment}>

                        <option value="">Select a department to add a shift</option>
                        {departments && departments.map((department) => (
                            <option key={department._id} value={department._id}>{department.name}</option>
                        ))}
                    </select>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4  mr-2 rounded-xl">Save</button>
                    <button type="button" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-xl">Cancel</button>
                    <div className='text-center py-2 text-gray-500'>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewEmployeePage;
