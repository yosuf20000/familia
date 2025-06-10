import React, { useContext, useState } from 'react'
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

import {
    Bars3Icon,
    BellIcon,
} from '@heroicons/react/24/outline'
import { SideBarContext } from '../Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import NavDeskTop from './NavDeskTop'
import Logo from './LogoCom'



function Topbar() {
    const { user, loading, setLoading, setUser } = useAuth();




    const handleSignOut = async (e) => {
        try {
            setLoading(true)
            const res = await axios.post('http://localhost:3000/auth/logout', {
                email: user.email
            })
                .then(res => {
                    if (res.data?.isOk) {

                        setUser(null)

                    }

                }).finally(() => {
                    setLoading(false)

                })





        } catch (err) {
            console.error(err);
            // setMessage(err.response?.data?.error || 'Login failed.');

        }
    }
    const userNavigation = [
        // { name: 'Your profile', href: '#' },
        { name: 'Sign out', href: '#', handleOnClick: handleSignOut },
    ]


    const { sidebarOpen, setSidebarOpen } = useContext(SideBarContext);


    return (
        <div className="sticky top-0 z-40 flex flex-row-reverse h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
            </button>

            {/* Separator */}
            <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden " />
            <div className='flex items-center justify-between w-full '>
                {!user && <div>
                    <button
                        type="button"
                        className="rounded-md bg-white gap-x-2  px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                    >
                        تسجيل دخول
                    </button>

                </div>}
                {user && <Menu as="div" className="relative">
                    <MenuButton className="-m-1.5 flex items-center p-1.5 ">
                        <span className="sr-only">Open user menu</span>
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            className="size-8 rounded-full bg-gray-50"
                        />
                        <span className="hidden lg:flex lg:items-center">
                            <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-900">
                                {user?.email || "guest"}
                            </span>
                            <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400" />
                        </span>
                    </MenuButton>
                    <MenuItems
                        transition
                        className="absolute  z-10 mt-2.5 left-0 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                        {userNavigation.map((item) => (
                            <MenuItem key={item.name}>
                                <a
                                    href={item.href}
                                    onClick={item.handleOnClick}
                                    className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                >
                                    {item.name}
                                </a>
                            </MenuItem>
                        ))}
                    </MenuItems>
                </Menu>}
                <NavDeskTop />
                <Logo />
            </div>


        </div>
    )
}

export default Topbar
