import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import UserContext from './UserContext';
import LoadingSpinner from './LoadingSpinner'

export const ProtectedAdminRoutes = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <LoadingSpinner />;
    }

    return user && user.roles.some(role => role.role === "admin") ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedClientRoutes = () => {
    const { user } = useContext(UserContext);

    return user && user.roles.some(role => role.role === "client") ? <Outlet /> : '';
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