import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RedirectIfAuth = () => {
    const { user, loading } = useAuth();


    // if (loading) {
    //     return (
    //         <div className='  '>
    //                 <div className="flex items-center justify-center h-full w-full bg-indigo-900/5 animate-pulse">
    //                     <div className="animate-ping relative left-5 rounded-full h-20 w-20 border-t-4  border-indigo-700 border-opacity-50">
    //                     </div>
    //                     <p  className='fixed text-2xl text-indigo-800/90 animate-bounce'>غرض العايلة</p>
    //                     <div className="animate-ping rounded-full h-10 w-10 border-t-4 border-indigo-100 border-opacity-50">
    //                     </div>
    //                     <div className="animate-ping rounded-full h-15 w-15 border-t-4 border-indigo-100 border-opacity-50">
    //                     </div>
    //                 </div>
    //         </div>
    //     )
    // }
    return user ? <Navigate to="/"   replace /> : <Outlet />;
};

export default RedirectIfAuth;