import React, { useContext } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { createGroupContext } from '../../src/App';

function GroupsHeader() {
        const {createGroup, setCreateGroup} = useContext(createGroupContext);
      
    return (
        <div className=' flex flex-row-reverse justify-center  \ w-full p-4 gap-4 '>
            <p className="text-3xl font-semibold tracking-tight text-indigo-800 sm:text-5xl">
                المجموعات
            </p>
            <button
                type="button"
                className="rounded-md bg-indigo-600 text-center px-4 flex justify-center items-center text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                    console.log("here");
                    
                    setCreateGroup(true)
                }}
            >
                <PlusIcon aria-hidden="true" className="size-5 text-center"  />
                انشئ مجموعة 


            </button>

        </div>
    )
}

export default GroupsHeader
