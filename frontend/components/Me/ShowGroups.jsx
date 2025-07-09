import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { h1Header, hraderStyle, meSectionStyle } from '../../styles/styles'
import { Link, useNavigate } from 'react-router-dom';

function ShowGroups() {
    const navigate = useNavigate();


    const [groups, setGroups] = useState([]);
    const bgClasses = [
        'bg-blue-700/10',
        'bg-black/60',
        'bg-black/65',
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
        <div className={`${meSectionStyle}`}>
            <div className={`${hraderStyle}`}>
                <h1 className={`${h1Header} `}> مجموعاتي </h1>
            </div>
            <div className='flex flex-col items-center justify-center  mt-4 w-full   '>
                <ul dir='rtl' role="list" className="mt-3 grid grid-cols-1  gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 w-full     ">
                    {groups.map((group, index) => {

                        const bgClass = bgClasses[index % bgClasses.length];


                        return (
                            <li dir='rtl' key={group.groupId} className=" col-span-1 r  flex   h-20 border-b-10 border-b-indigo-950  rounded-md shadow-xl   ">
                                <Link
                                    className={classNames(
                                        `${bgClass}/bg-blue-700/10 `,


                                        'flex  shrink-0 items-center justify-center text-sm w-6/6   text-indigo-900 font-bold  flex-col hover:bg-indigo-200/10 ',
                                    )}
                                    to={`/groups/${group.groupTitle}`}
                                >
                                    <h1 className='text-xl uppercase '>

                                        {group.groupTitle}
                                    </h1>
                                    <p className="text-gray-500">{group.usersCount === 1 ? "مشارك واحد" : `مشاركين ${group.usersCount}`} </p>

                                </Link>

                            </li>
                        )
                    })}
                </ul>
            </div>



        </div>
    )
}

export default ShowGroups
