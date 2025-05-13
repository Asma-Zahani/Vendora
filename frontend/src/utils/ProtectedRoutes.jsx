import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import UserContext from './UserContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner'

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

    return user && user.role === "admin" ? <Outlet /> : <Navigate to="/login" />;
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
    
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedLivreurRoutes = () => {
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

    return user && (user.role === "admin" || user.role === "livreur") ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedResponsableRoutes = () => {
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

    return user && (user.role === "admin" || user.role === "responsable") ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedAuthRoutes = () => {
    const { user } = useContext(UserContext);

    if (user) {
        if (user.role === "admin") {
            return <Navigate to="/dashboard" />;
        }
        if (user.role === "livreur") {
            return <Navigate to="DashboardLivreur" />;
        }
        if (user.role === "responsable") {
            return <Navigate to="DashboardResponsable" />;
        }
        return <Navigate to="/" />;
    }
    return <Outlet />;
};