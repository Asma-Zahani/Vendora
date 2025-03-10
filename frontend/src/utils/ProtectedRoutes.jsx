import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import UserContext from './UserContext';
import LoadingSpinner from './LoadingSpinner'

export const ProtectedAdminRoutes = () => {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [user]);

    if (loading && localStorage.getItem('token')) {
        return <LoadingSpinner />; 
    }

    return user && user.roles.some(role => role.role === "admin") ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedClientRoutes = () => {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [user]);

    if (loading && localStorage.getItem('token')) {
        return <LoadingSpinner />; 
    }
    
    return user && user.roles.some(role => role.role === "client") ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedLivreurRoutes = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <LoadingSpinner />;
    }

    return user && user.roles.some(role => role.role === "livreur") ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedAuthRoutes = () => {
    const { user } = useContext(UserContext);

    if (user) {
        if (user.roles.some(role => role.role === "admin")) {
            return <Navigate to="/dashboard" />;
        }
        return <Navigate to="/" />;
    }
    return <Outlet />;
};