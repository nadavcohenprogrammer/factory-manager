/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../UserContext';
import { postData } from '../../services/utils';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [myProfile, setMyProfile] = useState({ firstName: '', lastName: '', email: '' });

    useEffect(() => {
        if (user) {
            setMyProfile({ firstName: user.firstName, lastName: user.lastName, email: user.email });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMyProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await postData(`/users/edit-user/${user._id}`, myProfile);
            setUser(updatedUser);
            alert('Your profile has been updated!');
            navigate('/');
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error);
            } else {
                console.error('Request error:', error.message);
                alert('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-32'>
                <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
                    <input 
                        type='text' 
                        name='firstName' 
                        id='firstName'  
                        placeholder="First Name" 
                        value={myProfile.firstName} 
                        onChange={handleChange} 
                    />
                    <input 
                        type='text' 
                        name='lastName' 
                        id='lastName'  
                        placeholder="Last Name" 
                        value={myProfile.lastName} 
                        onChange={handleChange} 
                    />
                    <input 
                        type='email' 
                        name='email' 
                        id='email' 
                        placeholder='your@email.com' 
                        value={myProfile.email} 
                        onChange={handleChange} 
                    />
                    <input 
                        type='password' 
                        name='password' 
                        id='password' 
                        placeholder='*********' 
                        value={myProfile.password} 
                        onChange={handleChange} 
                        // <FaRegEyeSlash />
                    />
                    
                    <button type='submit' className='primary'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default ProfilePage;
