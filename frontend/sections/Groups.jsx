import React, { createContext, useContext, useEffect, useState } from 'react'
import GroupsHeader from '../components/groups/GroupsHeader'
import GroupMembers from '../components/groups/GroupMembers';
import axios from 'axios';
import { createGroupContext } from '../src/App';

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

const array = [1, 2, 4, 5, 6, 7, 8]
function Groups() {
    const [groupMembers, setGroupMembers] = useState([]);

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

           
            <div className='flex w-full flex-wrap flex-col'>
                <div className='flex  gap-4  flex-wrap justify-center items-center max-lg:justify-center  grow-1 mx-4 flex-col  '>
                    


                </div>


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
