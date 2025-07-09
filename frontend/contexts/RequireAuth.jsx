import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Layout from '../components/Layout';
import { GiCrystalGrowth } from "react-icons/gi";


const RequireAuth = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Show a spinner or nothing
      }



    return user ? <Layout><Outlet/></Layout> : <Navigate to="/login" replace />;
};

export default RequireAuth;
