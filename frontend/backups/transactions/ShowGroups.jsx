import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function ShowGroups() {

    const [groups, setGroups] = useState([]);
    const bgClasses = [
        'bg-green-900/70',
        'bg-red-900/70',
        'bg-blue-900/70',
        'bg-yellow-900/70'
    ]

    useEffect(() => {
        try {
            axios.get(`${import.meta.env.VITE_API_URL}/api/v1/groups/groups-info`)
                .then(res => {
                    console.log(res.data);

                    setGroups(res.data)

                })
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [])

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <div className='flex flex-col items-center justify-center relative mx-auto  p-4  '>
            <div className='flex flex-col items-center justify-center  '>
                <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                    {groups.map((group, index) => {

                        const bgClass = bgClasses[index % bgClasses.length];


                        return (
                            <li key={group.groupId} className="col-span-1 flex rounded-md shadow-xs">
                                <div
                                    className={classNames(
                                        `${bgClass}`,
                                        

                                        'flex w-18 shrink-0 items-center justify-center rounded-l-md text-sm   text-white font-bold',
                                    )}
                                >
                                    {group.groupTitle}
                                </div>
                                <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
                                    <div className="flex-1 truncate px-4 py-2 text-sm">
                                        <a href={group.title} className="font-medium text-gray-900 hover:text-gray-600">
                                            {group.title}
                                        </a>
                                        <p className="text-gray-500">{group.usersCount === 1 ? "مشارك واحد" : `مشاركين ${group.usersCount}`} </p>
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
                        )
                    })}
                </ul>
            </div>



        </div>
    )
}

export default ShowGroups
