/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [panier, setPanier] = useState(null);
    const [wishlist, setWishlist] = useState(null);
    const [commandes, setCommandes] = useState(null);

    async function getUser() {
        if (!token) return;
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if(res.ok){
            setUser(data);
            setPanier(data.produits); 
            setWishlist(data.wishlist); 
            setCommandes(data.commandes)
        };
    }

    useEffect(() => {if(token) {getUser()}}, [token])
    
    return (
        <UserContext.Provider value={{ user, token, panier, wishlist, commandes, setUser, setToken, setPanier, setWishlist, setCommandes }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;