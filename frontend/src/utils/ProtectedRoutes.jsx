import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import UserContext from './UserContext';
import LoadingSpinner from './LoadingSpinner'

export const ProtectedAdminRoutes = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <LoadingSpinner />;
    }

    return user.role === "admin" ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedClientRoutes = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <LoadingSpinner />;
    }

    return user.role === "client" ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedLivreurRoutes = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <LoadingSpinner />;
    }

    return user.role === "livreur" ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedFournisseurRoutes = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <LoadingSpinner />;
    }

    return user.role === "fournisseur" ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedAuthRoutes = () => {
    const { token } = useContext(UserContext);

    if (token) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
};