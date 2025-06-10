import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { BiCopyright } from "react-icons/bi";


function GroupMembers() {
    const [groupMembers, setGroupMembers] = useState([]);
    useEffect(() => {
        try {
            axios.get(`${import.meta.env.VITE_API_URL}/api/v1/groups/user`)
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
                {groupMembers.map((memmber, index) => (
                    <div key={memmber.gUserId} className={`col-span-1 flex rounded-md shadow-xs mt-2 flex-row-reverse justify-between  items-center my-2   cursor-pointer ${memmber.groupLeader == memmber.gUserId? " bg-blue-200/50" : "bg-gray-200/50" }`}>
                        <div
                            className={classNames(
                                
                                'flex w-16 shrink-0 items-center justify-center rounded-r-md text-sm font-medium bg-indigo-600 h-full text-cyan-100 p-2 ',
                            )}
                        >
                            {memmber.gUserId}8467
                        </div>
                        <div>
                            <p>{memmber.fname} {memmber.lname} </p>
                        </div>
                        <div className={`flex items-center justify-center w-6 `}>
                            <p>{memmber.groupLeader == memmber.gUserId &&<BiCopyright className='text-2xl text-indigo-700' />}</p>
                        </div>

                    </div>
                ))}

            </div>


        </div>
    )
}

export default GroupMembers
