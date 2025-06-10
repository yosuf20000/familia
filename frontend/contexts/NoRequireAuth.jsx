import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Layout from '../components/Layout';
import { GiCrystalGrowth } from "react-icons/gi";


const NoRequireAuth = () => {
    const { user, loading } = useAuth();

    return <Layout user = {user} />
};

export default NoRequireAuth;