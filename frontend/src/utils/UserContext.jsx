/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    async function getUser() {
        if (!token) return;
        const res = await fetch('api/user', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if(res.ok){setUser(data)};
    }

    useEffect(() => {if(token) {getUser()}}, [token])
    
    return (
        <UserContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;