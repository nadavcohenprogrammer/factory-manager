/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom';
import { deleteData } from '../../services/utils';
import ProfilePage from './ProfilePage';

const AccountPage = () => {
    const navigate = useNavigate();
    const { subpage } = useParams();
    const { user, ready, setUser } = useContext(UserContext);

    const logout = async () => {
        try {
            await deleteData("/registration/logout");
            setUser(null);
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    if (!ready) {
        return 'Loading...';
    }

    if (!user && ready) {
        return <Navigate to={`/login`} />;
    }

    return (
        <div>
            <nav className='w-full flex mt-8 justify-center gap-4 mb-8'>
                <Link className={!subpage ? 'py-2 px-6 bg-primary text-white rounded-full' : 'py-2 px-6 text-black rounded-full border-2'} to={'/account'}>My account</Link>
                <Link className={subpage === "profile" ? 'py-2 px-6 bg-primary text-white rounded-full' : 'py-2 px-6 text-black rounded-full border-2'} to={'/account/profile'}>My profile</Link>
            </nav>
            {!subpage && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user.firstName} - {user.lastName} with this email ({user.email})
                    <button className='primary max-w-sm mt-2' onClick={logout}>Logout</button>
                </div>
            )}
            {subpage === "profile" && <ProfilePage />}
        </div>
    );
};

export default AccountPage;
