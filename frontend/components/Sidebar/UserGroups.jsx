import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



function UserGroups() {
    const [groupMembers, setGroupMembers] = useState([]);
    const navigate = useNavigate();

    
    useEffect(() => {
        try {
            axios.get(`${import.meta.env.VITE_API_URL}/api/v1/groups/groups-info`)
                .then(res => {
                    console.log(res.data);
                    
                    setGroupMembers(res.data)

                })
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [])

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

    return (
        <div className='flex flex-col items-end mt-2'>
            <h1 className='text-gray-700  hover:text-indigo-600 font-bold' >مجموعاتي</h1>
            <div className='flex flex-col px-0 my-2 w-full '>
                {groupMembers.map((group, index) => (
                    <div key={group.groupId} className={`col-span-1 flex rounded-md shadow-xs mt-2 flex-row-reverse justify-between  items-center my-2 bg-indigo-800   cursor-pointer `}
                    onClick={() => {
                        navigate(`/groups/${group.groupTitle}`)

                    }}
                    
                    >
                        <div
                            className={classNames(
                                
                                'flex shrink-0 items-center justify-center rounded-r-md text-sm font-medium bg-indigo-600 h-full text-white p-4  ',
                            )}
                        >
                            {group.groupId}
                        </div>
                        <div  className="flex  flex-col items-center grow-1">
                            <p className='font-bold text-white'>{group.groupTitle} </p>
                            <p className='text-white '>{group.usersCount} :الأعضاء</p>
                        </div>
                        <div className={`flex items-center justify-center w-6 `}>

                            
                        </div>

                    </div>
                ))}

            </div>


        </div>
    )
}

export default UserGroups
