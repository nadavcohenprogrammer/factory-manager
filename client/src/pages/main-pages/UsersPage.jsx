/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarItem from '../../components/Sidebar/SidebarItem';
import { BsPencilSquare } from 'react-icons/bs';
import { FaUsersCog, FaRegTrashAlt } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';

function UsersPage() {
    const { companyId } = useParams();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/users');
                setUsers(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='flex'>
            <SidebarItem />
            <div className='flex-grow'>
                <h1 className='text-center p-4 mt-4 font-bold text-2xl'>Users</h1>
                <div className='mt-4 mb-4 text-right'>
                    <Link to={`/add-user/${companyId}`} className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
                        Add New User
                    </Link>
                </div>
                <div className='p-4'>
                    <table className='w-full text-center rounded-lg shadow-md overflow-y-auto'>
                        <thead>
                            <tr className='bg-gray-200'>
                                <th className='p-2'></th>
                                <th className='p-2'>User Name</th>
                                <th className='p-2'>Email</th>
                                <th className='p-2'>Phone</th>
                                <th className='p-2'>Role</th>
                                <th className='p-2'>Manager Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} className='border-b-2'>
                                    <td className='p-2 flex justify-center space-x-2'>
                                        <span className='text-red-500 hover:bg-blue-600 p-1 cursor-pointer hover:rounded-md hover:text-white'><FaRegTrashAlt /></span>
                                        <span className='text-gray-500 text-xl hover:bg-blue-600 p-1 cursor-pointer hover:rounded-md hover:text-white'><BsPencilSquare /></span>
                                        <span className='text-blue-700 text-xl hover:bg-blue-600 p-1 cursor-pointer hover:rounded-md hover:text-white'><IoIosMail /></span>
                                        <span className='text-blue-700 text-xl hover:bg-blue-600 p-1 cursor-pointer hover:rounded-md hover:text-white'><FaUsersCog /></span>
                                    </td>
                                    <td className='font-sans text-lg'>{user.firstName} {user.lastName}</td>
                                    <td className='font-sans text-lg'>{user.email}</td>
                                    <td className='font-sans text-lg'>{user.phoneNumber}</td>
                                    <td className='font-sans text-lg'>{user.companyRole}</td>
                                    <td className='font-sans text-lg'>
                                        {user?.company[0]?.manager[0]?.firstName} {user?.company[0]?.manager[0]?.lastName}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UsersPage;
