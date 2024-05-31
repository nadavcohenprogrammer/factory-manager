/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarItem from "../../components/Sidebar/SidebarItem";
import { BsPencilSquare } from "react-icons/bs";
import { FaUsersCog, FaRegTrashAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

function UsersPage() {
  const { companyId } = useParams();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/users');
        setUsers(data);
      } catch (err) { console.error(err) }
    };
    fetchData()
  }, []);


  return (
    <div>
      <div className="flex ">
        <SidebarItem />
        <div className="flex-grow">
          <h1 className="text-center p-4  mt-4 font-bold text-2xl">Users</h1>
          <div className="mt-4 mb-4">
          <Link
            to={`/add-user/${companyId}`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold ml-4 py-2 px-4 rounded"
          >
            Add New user
          </Link>
        </div>
          <div className="p-4 mt-4">
            <table className="w-full text-center  rounded-lg shadow-md max-h-screen overflow-y-auto">
              <thead >
                <tr className="bg-gray-200 ">
                  <th className="p-2 border-r-[3px] border-white rounded-tl-lg "></th>
                  <th className="p-2  ">User Name</th>
                  <th className="p-2 border-l-[3px] border-white">Email</th>
                  <th className="p-2 border-l-[3px] border-white">Phone</th>
                  <th className="p-2 border-l-[3px] border-white">Role</th>
                  <th className="p-2 rounded-tr-lg border-l-[3px] border-white">Manager Name</th>

                </tr>
              </thead>
              <tbody>
                <tr className='p-2 border-b-2 '>
                  <td className="p-4 rounded-tl-lg flex justify-center space-x-2 ">
                    <span className=' text-red-500 hover:bg-blue-600 p-1  cursor-pointer hover:rounded-md hover:text-white'><FaRegTrashAlt /></span>
                    <span className=' text-gray-500 text-xl hover:bg-blue-600 p-1 cursor-pointer hover:rounded-md hover:text-white'><BsPencilSquare /></span>
                    <span className=' text-blue-700 text-xl hover:bg-blue-600 p-1 cursor-pointer hover:rounded-md hover:text-white'><IoIosMail /></span>
                    <span className=' text-blue-700 text-xl hover:bg-blue-600 p-1 cursor-pointer hover:rounded-md hover:text-white'><FaUsersCog /></span>
                  </td >
                  <td className='font-sans text-lg'>moshe moshe</td>
                  <td className=' font-sans text-lg'>moshe@gmail.com</td>
                  <td className=' font-sans text-lg'>0587077368</td>
                  <td className='font-sans text-lg'>Sales lader</td>
                  <td className=' font-sans text-lg'>Bil Gets</td>
                </tr>
                <tr className='p-2 border-b-2 '>
                  <td className="p-4 rounded-tl-lg flex justify-center space-x-2 ">
                    <span className=' text-red-500 hover:bg-blue-600 p-1  cursor-pointer hover:rounded-md hover:text-white'><FaRegTrashAlt /></span>
                    <span className=' text-gray-500 text-xl hover:bg-blue-600 p-1 cursor-pointer hover:rounded-md hover:text-white'><BsPencilSquare /></span>
                    <span className=' text-blue-700 text-xl hover:bg-blue-600 p-1 cursor-pointer hover:rounded-md hover:text-white'><IoIosMail /></span>
                    <span className=' text-blue-700 text-xl hover:bg-blue-600 p-1 cursor-pointer hover:rounded-md hover:text-white'><FaUsersCog /></span>
                  </td >
                  <td className='font-sans text-lg'>moshe moshe</td>
                  <td className=' font-sans text-lg'>moshe@gmail.com</td>
                  <td className=' font-sans text-lg'>0587077368</td>
                  <td className='font-sans text-lg'>Sales lader</td>
                  <td className=' font-sans text-lg'>Bil Gets</td>
                </tr>
                <tr className='p-2 border-b-2 '>
                  <td className="p-4 rounded-tl-lg flex justify-center space-x-2 ">
                    <span className=' text-red-500 hover:bg-blue-600 p-1  cursor-pointer hover:rounded-md hover:text-white'><FaRegTrashAlt /></span>
                    <span className=' text-gray-500 text-xl hover:bg-blue-600 p-1 cursor-pointer hover:rounded-md hover:text-white'><BsPencilSquare /></span>
                    <span className=' text-blue-700 text-xl hover:bg-blue-600 p-1 cursor-pointer hover:rounded-md hover:text-white'><IoIosMail /></span>
                    <span className=' text-blue-700 text-xl hover:bg-blue-600 p-1 cursor-pointer hover:rounded-md hover:text-white'><FaUsersCog /></span>
                  </td >
                  <td className='font-sans text-lg'>moshe moshe</td>
                  <td className=' font-sans text-lg'>moshe@gmail.com</td>
                  <td className=' font-sans text-lg'>0587077368</td>
                  <td className='font-sans text-lg'>Sales lader</td>
                  <td className=' font-sans text-lg'>Bil Gets</td>
                </tr>
                <tr className='p-2 border-b-2 '>
                  <td className="p-4 rounded-tl-lg flex justify-center space-x-2 ">
                    <span className=' text-red-500 hover:bg-blue-600 p-1  cursor-pointer hover:rounded-md hover:text-white'><FaRegTrashAlt /></span>
                    <span className=' text-gray-500 text-xl hover:bg-blue-600 p-1 cursor-pointer hover:rounded-md hover:text-white'><BsPencilSquare /></span>
                    <span className=' text-blue-700 text-xl hover:bg-blue-600 p-1 cursor-pointer hover:rounded-md hover:text-white'><IoIosMail /></span>
                    <span className=' text-blue-700 text-xl hover:bg-blue-600 p-1 cursor-pointer hover:rounded-md hover:text-white'><FaUsersCog /></span>
                  </td >
                  <td className='font-sans text-lg'>moshe moshe</td>
                  <td className=' font-sans text-lg'>moshe@gmail.com</td>
                  <td className=' font-sans text-lg'>0587077368</td>
                  <td className='font-sans text-lg'>Sales lader</td>
                  <td className=' font-sans text-lg'>Bil Gets</td>
                </tr>



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
    </div>
  );
}

export default UsersPage;

{/* <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Max Actions Allowed
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Current Actions Allowed Today
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">{user.firstName} {user.lastName}</td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{user.numOfActions}</td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">{user.numOfActions - user.currentActions}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
