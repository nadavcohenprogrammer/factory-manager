/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// import { getUsers, unblockUser, getUserCompanies } from '../api'; // Import API functions for fetching data and performing actions
import { BsPencilSquare, BsUnlock, BsBuilding } from 'react-icons/bs';
import { fetchData } from '../../services/utils';
import { UserContext } from "../../UserContext";


const Crm = () => {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [company, setCompany] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        const getData = async () => {
            const users = await fetchData('/users');
            setUsers(users);
            const company = await fetchData('/companies/companies');
            setCompany(company);

        }
        getData();
    }, []);

    const handleUnblockUser = (userId) => {
        // Call API to unblock user
        // unblockUser(userId).then(() => {
        //     // Update user list after unblocking user
        //     getUsers().then((data) => {
        //         setUsers(data);
        //     });
        // });
    };

    const handleUpdateUser = () => {

    }

    const handleViewUserCompanies = (userId) => {
        // Call API to get companies associated with user
        // getUserCompanies(userId).then((companies) => {
        //     // Display companies associated with user
        //     console.log(companies);
        // });
    };

    return (
        <div className="flex ">
            {/* <SidebarItem /> */}
            <div className="flex-grow">
                <h1 className="text-2xl font-bold mb-4 mt-4 text-center">CRM</h1>
                <div className="mt-4 mb-4">
                    <Link
                        to="/add-company"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold ml-4 py-2 px-4 rounded"
                    >
                        Create Company
                    </Link>
                </div>


                <div className="p-4 mt-6">
                    {/* <p className="rounded-md border w-fit p-2 text-lg font-semibold"></p> */}
                    <table className="w-full text-center mt-1 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 rounded-tl-lg"></th>
                                <th className="p-2 ">User Name</th>
                                <th className="p-2 ">Email</th>
                                <th className="p-2">Company Name</th>
                                <th className="p-2">Role</th>
                                <th className="p-2 rounded-tr-lg">Manager Name</th>

                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className='p-2 border-b-2 '>
                                    <td className="p-2 rounded-tl-lg flex gap-2">
                                        <button className=' text-blue-700 text-xl bg-white hover:bg-blue-600 p-1 cursor-pointer hover:rounded-md hover:text-white'><BsPencilSquare /></button>
                                        <button className=' text-blue-700 text-xl bg-white hover:bg-blue-600 p-1 cursor-pointer hover:rounded-md hover:text-white'><BsUnlock /></button>
                                        <button className=' text-blue-700 text-xl bg-white hover:bg-blue-600 p-1 cursor-pointer hover:rounded-md hover:text-white'><BsBuilding /></button>
                                    </td >
                                    <td>{user?.firstName} {user.lastName}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.company[0]?.name}</td>
                                    {/* going to be shown in companies icon */}
                                    <td>{user?.companyRole}</td>
                                    <td>{user?.company[0]?.manager[0].firstName} {user?.company[0]?.manager[0].lastName}</td>
                                </tr>
                            ))}
                        </tbody>
                        {/* <tbody>
                                {employeesWithShifts?.map((employee) => (
                                    <TableRows
                                        key={employee._id}
                                        employee={employee}
                                        department={department}
                                    />
                                ))}
                            </tbody> */}
                    </table>
                </div>

            </div>
        </div>
    );
};



export default Crm;
