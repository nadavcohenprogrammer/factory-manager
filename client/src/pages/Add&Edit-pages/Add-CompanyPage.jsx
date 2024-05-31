/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoCloudUploadOutline } from "react-icons/io5"
const AddCompanyPage = () => {
    const SuperAdminId = '6603041eeec39b8676a89c0c'
    const navigate = useNavigate();
    const [addedPhoto, setAddedPhoto] = useState('');
    const [uploadPhoto, setUploadPhoto] = useState('');
    const [photoLink, setPhotoLink] = useState('');
    const [companyName, setCompanyName] = useState('');

    const addPhotoByLink = async (e) => {
        e.preventDefault()
        const { data } = await axios.post("/file/upload-by-link", { link: photoLink })
        console.log(data)
        setAddedPhoto(data)
        setPhotoLink('');
    }

    const addPhoto = async (e) => {
        const file = e.target.files;
        const formData = new FormData();
        formData.set('file', file[0]);

        const { data } = await axios.post("/file/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(data)
        setAddedPhoto(data);
        setUploadPhoto('');
    };

    const handleCreateCompany = async (e) => {
        e.preventDefault();
        if (!addedPhoto && !companyName) { return alert("Company most have a name") }
        try {
            if (addedPhoto) {
                const { data } = await axios.post('/companies/add-company',
                    { name: companyName, logo: addedPhoto })
                await axios.post(`/users/add-company/${data.newCompany._id}`, { userId: SuperAdminId })
            } else {
                const company = await axios.post('/companies/add-company', {
                    company_name: companyName
                })
                await axios.post(`/users/add-company/${company._id}`, { userId: { SuperAdminId } })
                //@TODO check if need to cover also adding without a photo 
            }
            navigate('/crm');
        } catch (error) {
            console.log(error)
            navigate('/crm');
        }
    }

    const handleCancel = () =>
        navigate('/crm');




    return (
        <div className="max-w-screen-2xl mx-auto mt-8 p-4 bg-white rounded-lg border-2 shadow-2xl">
            <h1 className="text-2xl font-semibold text-center mb-4">Create New Company</h1>
            <form>
                <div className="mb-4">
                    <input
                        className="shadow  border rounded w-full py-2 px-3 text-gray-700 
                       focus:outline-none focus:shadow-outline"
                        id="department-name"
                        type="text"
                        placeholder="Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />

                    <h2 className='text-xl mt-4 font-sans font-bold'>Logo</h2>

                    <div className='flex gap-2 items-center'>
                        <input type='text'
                            placeholder='Add using a link ....jpg'
                            value={photoLink}
                            onChange={(e) => setPhotoLink(e.target.value)}
                        />
                        <button onClick={addPhotoByLink}
                            className='bg-primary px-4 text-white hover:bg-red-700 text-sm h-10 rounded-2xl'>
                            Add&nbsp;link
                        </button>
                    </div>
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
                    onClick={handleCreateCompany}
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

export default AddCompanyPage