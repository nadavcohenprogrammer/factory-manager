/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { IoCloudUploadOutline } from "react-icons/io5"
import { fetchData } from '../../services/utils';
import AlertMessage from '../../Alert-Message';
//  import UserDropdown from '../../components/Dropdowns/UserDropdown';
 {/* <UserDropdown/> */}
// import IndexDropdown from '../../components/Dropdowns/IndexDropdown';
{/* <IndexDropdown/> */}
const EditCompanyPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [addedPhoto, setAddedPhoto] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [users, setUsers] = useState([]);
    const [company, setCompany] = useState([]);
    const [alert, setAlert] = useState(false);
    const [selectedManager, setSelectedManager] = useState([]);

    useEffect(() => {
        const importData = async () => {
            const company = await fetchData(`/companies/company/${id}`);
            console.log(company)
            const users = await fetchData(`/users/company-users/${id}`);
            setUsers(users);
            setCompany(company);
            setCompanyName(company.name);
            setAddedPhoto(company.logo);
        }
        importData()
    }, [])


    const addPhoto = async (e) => {
        const file = e.target.files;
        const formData = new FormData();
        formData.set('file', file[0]);

        const { data } = await axios.post("/file/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        setAddedPhoto(data);

    };

    const handleManagerChange = (e) => {
        const { checked, name } = e.target;
        if (checked) {
            setSelectedManager([...selectedManager, name]);
        } else {
            setSelectedManager(selectedManager.filter(manager => manager !== name));
        }
    };

    const handleUpdateCompany = async (e) => {
        e.preventDefault();
        if (!companyName) {
            setAlert(true);
            return;
        }
        try {
            if (addedPhoto) {
                await axios.patch(`/companies/company/${id}`,
                    { name: companyName, logo: addedPhoto, manager: selectedManager })
            } else {
                await axios.patch(`/companies/company/${id}`, {
                    name: companyName
                })
            }
            navigate('/');
        } catch (error) {
            console.log(error)
            navigate('/');
        }
    }

    const handleCancel = () =>
        navigate('/');




    return (
        <div className="max-w-screen-2xl  mx-auto mt-8 p-4 bg-white rounded-lg border-2 shadow-2xl">
            <h1 className="text-2xl font-semibold text-center mb-4">Edit Company</h1>
            <form>
                <div className="mb-4">
                    <h2 className='text-xl ml-2 mt-4 font-sans font-bold'>Name</h2>
                    <input
                        className="shadow border rounded  mb-1 py-2 px-3 text-gray-700 
                       focus:outline-none focus:shadow-outline"
                        id="department-name"
                        type="text"
                        placeholder="Company Name"
                        value={companyName}
                        onChange={(e) => (setCompanyName(e.target.value), setAlert(false))}
                    />
                    {!companyName && <AlertMessage />}
                    <h2 className='text-xl ml-2 mt-4 font-sans font-bold'>Company Manager</h2>
                    {/* <div 
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 
                       focus:outline-none focus:shadow-outline"
                        id="employeeList"
                    //   className="border border-gray-300 rounded-md p-2 w-full"
                    //   onChange={handleSelectEmployee}
                    > */}

                    <div className='grid gap-2 grid-cols-4 mt-2'>
                        {users?.map(user => (
                            <label key={user?._id} className='border flex gap-2 p-4 rounded-lg text-center w-40'>
                                <input
                                    type='checkbox'
                                    name={user._id}
                                    // value={user?._id}
                                    onChange={handleManagerChange}
                                />
                                <span>{user.firstName} {user.lastName}</span>
                            </label>
                        ))}
                    </div>
                    {/* </div> */}

                    <h2 className='text-xl ml-4  my-4 font-sans font-bold'>Logo</h2>

                    <div className='bg-slate-100  rounded-2xl w-56 p-2 ml-3'>
                        {!addedPhoto ? <label
                            className='border-2 flex self-center  w-44 justify-center cursor-pointer hover:bg-blue-500 hover:text-white bg-transparent text-gray-600 text-2xl 
                        rounded-2xl p-14 m-2'>
                            <input type='file' className='hidden' onChange={addPhoto} />
                            <IoCloudUploadOutline />
                        </label> : <label
                        >
                            <input type='file' className='hidden' onChange={addPhoto} />
                            <img src={'http://localhost:3000/uploads/' + addedPhoto} alt='company logo'
                                className='rounded-2xl h-36 w-48 shadow-lg object-cover' /></label>}
                        {/* <img src={addPhoto} alt='company logo' className='w-32 h-32 object-cover' /> */}

                    </div>

                </div>
                {/* Add more form fields for department data, e.g., manager */}
                <button
                    type="button"
                    onClick={handleUpdateCompany}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                    Cancel
                </button>
            </form>
        </div>
    )
}

export default EditCompanyPage
