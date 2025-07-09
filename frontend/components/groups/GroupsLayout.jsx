import React from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function GroupsLayout() {
    const navigate = useNavigate();
    const isActive = location.pathname 
    console.log(isActive);
    


    return (
        <div>
            {isActive != "/groups/create" &&<button
                className="fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-xl hover:bg-blue-700 transition z-300 animate-bounce  "
                onClick={() => {
                    navigate('create')
                }}
            >
                انشئ مجموعة
            </button> }
            <Outlet />
        </div>
    )
}

export default GroupsLayout
