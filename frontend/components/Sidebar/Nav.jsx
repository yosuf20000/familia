import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { navigations } from '.';




function Nav() {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const location = useLocation(); // gives you the current route path


    return (
        <div className='flex flex-col border-b border-gray-200  '>


            {navigations.map((item) => {
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
