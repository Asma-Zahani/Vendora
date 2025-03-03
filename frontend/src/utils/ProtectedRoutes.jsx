import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import UserContext from './UserContext';
import LoadingSpinner from './LoadingSpinner'

export const ProtectedAdminRoutes = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <LoadingSpinner />;
    }

    return user && user.role === "admin" ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedClientRoutes = () => {
    const { user } = useContext(UserContext);

    return user && user.role === "client" ? <Outlet /> : '';
};

export const ProtectedLivreurRoutes = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <LoadingSpinner />;
    }

    return user && user.role === "livreur" ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedFournisseurRoutes = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <LoadingSpinner />;
    }

    return user && user.role === "fournisseur" ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedAuthRoutes = () => {
    const { user } = useContext(UserContext);

    if (user) {
        if (user.role === "admin") {
            return <Navigate to="/dashboard" />;
        }
        return <Navigate to="/" />;
    }
    return <Outlet />;
};