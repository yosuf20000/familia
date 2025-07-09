import React from 'react'
import { GrTransaction, GrGroup } from "react-icons/gr";
import { GiReceiveMoney } from "react-icons/gi";
import { Outlet, Link, useLocation } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { navigations } from '.';



function NavDeskTop() {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const location = useLocation(); // gives you the current route path


    return (
        <div className='flex max-lg:hidden gap-6 flex-row-reverse   '>


            {navigations.map((item) => {
                const isActive = location.pathname === item.href;


                return (
                    <div className='my-2 justify-between flex gap-4 ' key={item.name}>
                        <Link
                            to={item.href}
                            className={classNames(
                                isActive
                                    ? 'bg-gray-50 text-indigo-600'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-right w-full justify-between',
                            )}
                        >
                            <item.icon
                                aria-hidden="true"
                                className={classNames(
                                    isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                    'size-6 shrink-0',
                                )}
                            />
                            {item.name}
                        </Link>

                    </div>
                )
            })}

        </div>
    )
}

export default NavDeskTop
