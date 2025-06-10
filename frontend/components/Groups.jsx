import React, { useContext, useEffect, useState } from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import axios from 'axios';
import Context from '../sections/Context';
import { SelectedGroupContext } from './Layout';

const bgClasses = [
  'bg-red-200',
  'bg-green-200',
  'bg-blue-200',
  'bg-yellow-200'
]


function Groups() {
  const [userGroups, setUserGroups] = useState([]);
  const { selectedGroup, setSelectedGroup } = useContext(SelectedGroupContext);


  useEffect(() => {
    try {
      axios.get(`${import.meta.env.VITE_API_URL}/api/v1/groups/user`)
        .then(res => {

          setUserGroups(res.data)

        })
    } catch (error) {
      console.error("Error fetching data:", error);
    }



  }, [])
  return (
    <div className='mt-4  flex flex-col items-end '>
      <h2 className="text-sm font-medium text-gray-500 my-2">مجموعاتي </h2>
      <ul role="list" className="flex justify-end gap-4 flex-col   w-full  ">
        {userGroups.map((userGroup, index) => {
          const bgClass = bgClasses[index % bgClasses.length];
          return (
            <>
              <li
                key={userGroup.groupId}
                onClick={
                  () => {
                    setSelectedGroup(userGroup)
                  }}
                className={`col-span-1 flex rounded-md shadow-xs flex-row-reverse    `}>
                <div
                  className={`relative     overflow-hidden shadow-lg

                    flex w-16 shrink-0 items-center justify-center rounded-r-md    text-sm font-medium text-white  p-6  ${bgClass}
                    ${selectedGroup.groupId === userGroup.groupId ?
                      `border-l-10 border-indigo-900     `
                      : `   `}`}
                >
                  {userGroup.groupId}
                 
                  <div className={
                    `${selectedGroup.groupId === userGroup.groupId ?
                      " water"
                      : `  ${bgClass} `}
                    absolute bottom-0 w-full bg-indigo-500 flex justify-center items-center text-indido-700 
                    
                    `
                  }>

                    {selectedGroup.groupId === userGroup.groupId ? userGroup.groupId : ""}
                  </div>
                </div>
                <div className={`flex flex-1 items-center justify-between truncate rounded-l-md border-t border-l border-b   border-gray-200 flex-row-reverse text-right  `}>
                  <div className="flex-1 truncate pl-1 pr-4 py-2 text-sm">
                    <a className=" text-gray-900 hover:text-gray-600 font-bold">
                      {userGroup.groupTitle}
                    </a>
                    <p className="text-gray-500">{userGroup.usersCount}  عدد الموجودين</p>
                  </div>
                  <div className="shrink-0 pr-2">
                    <button
                      type="button"
                      className="inline-flex size-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                    >
                      <span className="sr-only">Open options</span>
                      <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                    </button>
                  </div>
                </div>

              </li>


            </>
          )
        })}
      </ul>
    </div>
  )
}



export default Groups
