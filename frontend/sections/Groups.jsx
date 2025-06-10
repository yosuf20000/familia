import React, { createContext, useContext, useEffect, useState } from 'react'
import GroupsHeader from '../components/groups/GroupsHeader'
import GroupMembers from '../components/groups/GroupMembers';
import axios from 'axios';
import { createGroupContext } from '../src/App';

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import CreateGroup from '../components/groups/CreateGroup';
export const cgroupMembersContext = createContext();

const array = [1, 2, 4, 5, 6, 7, 8]
function Groups() {
    const [groupMembers, setGroupMembers] = useState([]);
    const { createGroup, setCreateGroup } = useContext(createGroupContext);

    useEffect(() => {
        try {
            axios.get(`${import.meta.env.VITE_API_URL}/api/v1/groups/groupMmebers`)
                .then(res => {


                    setGroupMembers(res.data)

                })
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [])

    return (
        <div className='flex flex-col items-center  min-h-screen p-4'>

            <GroupsHeader />
            <div className='flex w-full flex-wrap '>
                {createGroup && <div className='flex  gap-4  flex-wrap justify-center items-center max-lg:justify-center  grow-1 mx-4 flex-col  '>
                    <div className="text-center">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                            className="mx-auto size-12 text-gray-400"
                        >
                            <path
                                d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <h2 className="mt-2 text-base font-semibold text-gray-900">اضف  مشاركين للمجموعة</h2>
                        {/* <p className="mt-1 text-sm text-gray-500">
                            You haven’t added any team members to your project yet. As the owner of this project, you can manage team
                            member permissions.
                        </p> */}
                    </div>
                    <CreateGroup />


                </div>}


                <div className='flex  gap-4 mt-2 flex-wrap justify-center items-start max-lg:justify-center '>
                    {groupMembers.map((groub, index) => {
                        return (

                            <GroupMembers key={index} {...groub} />
                        )
                    })}
                </div>

            </div>

        </div>
    )
}

export default Groups
