import React from 'react'
import { GrTransaction, GrGroup } from "react-icons/gr";
import { GiReceiveMoney } from "react-icons/gi";
import { Outlet, Link, useLocation } from "react-router-dom";
import { IoHome } from "react-icons/io5";



function Nav() {
    const navigation = [
        { name: 'الرئيسة', href: '/', icon: IoHome, current: true },
        { name: 'الحوالات', href: '/transactions', icon: GrTransaction, current: true },
        { name: 'الغروض', href: '/loans', icon: GiReceiveMoney, current: false },
        { name: 'المجموعات', href: '/groups', icon: GrGroup, current: false },


    ]
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const location = useLocation(); // gives you the current route path


    return (
        <div className='flex flex-col border-b border-gray-200  '>


            {navigation.map((item) => {
                const isActive = location.pathname === item.href;


                return (
                    <div className='my-2 justify-between flex ' key={item.name}>
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

export default Nav
