/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('/registration/profile');
                if (data) {
                    setUser({ ...data, chosenCompany: data.company[0] });
                } else {
                    setUser(null);
                }
                setReady(true);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setUser(null);
                setReady(true);
            }
        };
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
};
