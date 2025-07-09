'use client'

import { createContext, useContext, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from '@headlessui/react'
import {
    XMarkIcon,
} from '@heroicons/react/24/outline'

import UserGroups from './Sidebar/UserGroups'
import Nav from './Sidebar/Nav'
import Logo from './Sidebar/LogoCom'
import WrapTransaction from './Sidebar/WrapTransaction'
import Groups from './Groups'
import { Navigate, Outlet } from 'react-router-dom';
import Topbar from './Sidebar/Topbar'
import NetworkStatus from './NetworkStatus'



export const SideBarContext = createContext();
export const SelectedGroupContext = createContext();


export default function Layout({children}) {
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false)

    


    return (
        <div className=''>
            <NetworkStatus/>

            <SelectedGroupContext.Provider value={{ selectedGroup, setSelectedGroup }}>

                <div>
                    <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden ">
                        <DialogBackdrop
                            transition
                            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0  "
                        />

                        <div className="fixed inset-0 flex ">
                            <DialogPanel
                                transition
                                className="relative ml-auto flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:translate-x-full  "
                            >
                                <TransitionChild>
                                    <div className="absolute top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0 right-full">
                                        <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                                        </button>
                                    </div>
                                </TransitionChild>
                                {/* Sidebar component, swap this element with another sidebar if you like */}
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                    <Logo />
                                    <nav className="flex flex-1 flex-col">
                                        <Nav />
                                    
                                    </nav>

                                    {/* <WrapTransaction /> */}
                                </div>
                            </DialogPanel>
                        </div>
                    </Dialog>

                    {/* Static sidebar for desktop */}


                    <div className="">
                        <SideBarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
                            <Topbar />
                        </SideBarContext.Provider>




                        <main className="">

                            <Outlet />
                        </main>
                    </div>


                    

                </div>
            </SelectedGroupContext.Provider>

        </div>
    )
}
