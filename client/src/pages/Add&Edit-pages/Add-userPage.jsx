/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../UserContext";
import { fetchData, postData } from '../../services/utils';


function AddUserPage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { companyId, departmentId } = useParams();
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [permission, setPermission] = useState([]);
  const [selectDepartmen, setSelectDepartmen] = useState('')
  const [company, setCompany] = useState()
  const [nextBtn, setNextBtn] = useState(false)
  const [departments, setDepartments] = useState([])


  useEffect(() => {
    const importData = async () => {
      const company = await fetchData(`/companies/company/${user.chosenCompany._id.toString()}`);
      setCompany(company);
      const departments = await fetchData(`/companies/company/departments/${user.chosenCompany._id.toString()}`);
      setDepartments(departments.department);
    }
    if (user)
      importData(); 
  }, [user]);

  const handlePermissions = (e) => {
    const { value, name } = e.target;
    setPermission(prevState => {
        // Check if an object with the provided name exists
        const index = prevState.findIndex(obj => obj.name === name);

        if (index !== -1) {
            // If object with name exists, update its value
            return prevState.map((obj, i) => (i === index ? { ...obj, value } : obj));
        } else {
            // If object with name doesn't exist, add a new object
            return [...prevState, { name, value }];
        }
    });
};


const handleAddUser = async (e) => {
  e.preventDefault()
  try {
    const user = await postData(`/users/add-user`, {
      firstName: fname,
      lastName: lname,
      email,
      password,
      companyId,
    })
    await postData(`/users/add-department/${user._id}`, { permission })
    navigate(`/departments/${companyId}`)

  } catch (error) {
    if (error.response) {
      alert(error.response.data.error);
    } else {
      console.error('Request error:', error.message);
      alert('An unexpected error occurred. Please try again later.');
    }
  }
}

const handleCancel = () => {
  setNextBtn(false);
  navigate(`/employees/${company._id.toString()}`);
};


return (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-semibold mb-4 text-center">New User</h1>
    <div className="flex items-center mb-4">
      {!nextBtn &&
        <form className='max-w-md mx-auto' onSubmit={() => setNextBtn(!nextBtn)}>
          <input type='text' placeholder='John' value={fname} onChange={(e) => setFname(e.target.value)} />
          <input type='text' placeholder='Doe' value={lname} onChange={(e) => setLname(e.target.value)} />
          <input type='email' placeholder='your@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='His Password' value={email} onChange={(e) => setPassword(e.target.value)} />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4  mr-2 rounded-xl">
            Next
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-xl">
            Cancel
          </button>

          <div className='text-center py-2 text-gray-500'>
          </div>
        </form>}

      {nextBtn &&
        <div className='max-w-xl min-w-xl mx-auto'>
          <table className='will-change-scroll text-center mt-1 ring ring-slate-200 rounded-lg shadow-2xl' >
            <thead>
              <tr className="bg-gray-200">
                <th className='p-2   rounded-tl-lg'>Department</th>
                <th className='p-2 border-l-[2px] border-white '>blocked</th>
                <th className='p-2 border-l-[2px] border-white '>Viewing only</th>
                <th className='p-2 border-l-[2px] border-white rounded-tr-lg'>Viewing and editing</th>
              </tr>
             
            </thead>
            <tbody>
              {departments.map(department => (
                <tr key={department._id}>
                  <td className="p-2 border-b">{department.name}</td>
                  <td className="p-2 border-b">
                    <input type="radio" name={`${department._id}`} value="block" onChange={(e) => handlePermissions(e)} />
                  </td>
                  <td className="p-2 border-b">
                    <input type='radio' name={`${department._id}`} value="view" onChange={(e) => handlePermissions(e)} />
                  </td>
                  <td className="p-2 border-b">
                    <input type='radio' name={`${department._id}`} value="edit" onChange={(e) => handlePermissions(e)} />
                  </td>
                </tr>
              ))}
              <tr className='mt-2'>
                <td >
                  <button
                    type="button"
                    onClick={handleAddUser}
                    className="bg-blue-500 hover:bg-blue-600 ml-1 mt-2 text-white font-bold py-2 px-4  mr-2 rounded-xl">
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-600 mb-1 text-white font-bold py-2 px-4 rounded-xl">
                    Cancel
                  </button>
                </td>
              </tr>
            </tbody>

          </table>
        </div>}
    </div>
  </div>
);
}

export default AddUserPage;
