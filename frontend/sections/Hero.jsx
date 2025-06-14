import React, { useState } from 'react'

import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'


function Hero() {
    return (
        <div className='bg-white'>
            {/* 3 column wrapper */}


            <div className="bg-gray-50 py-24 sm:py-32">
                <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                    <div className='w-full flex justify-between gap-10 items-center bg-gray-100 overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] p-4 '>
                        <h2 className="text-center text-base/7 font-semibold text-grey-600 justify-self-end ">يوسف الصويلح</h2>
                        <h2 className="text-center text-base/7 font-semibold text-grey-600 justify-self-end ">ID : 94723893  عائلة الصويلح </h2>
                        <div className=" flex items-center justify-center ">
                            <a
                                href="#"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                توثيق حوالة
                            </a>

                        </div>
                    </div>
                    <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl mt-4">
                        معلومات عن القرض الحالي
                    </p>
                    <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2 ">

                        <div className="relative max-lg:row-start-1 lg:row-span-2">
                            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-indigo-600 max-lg:text-center">شروط واتتفاقيات العايلة</p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">

                                    </p>
                                </div>
                                {/* <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                                    <img
                                        className="w-full max-lg:max-w-xs"
                                        src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png"
                                        alt=""
                                    />
                                </div> */}
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
                        </div>
                        <div className="relative max-lg:row-start-1 lg:row-span-1 ">
                            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-indigo-600 max-lg:text-center">اخر 3 حوالات</p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">

                                    </p>
                                </div>
                                {/* <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                                    <img
                                        className="w-full max-lg:max-w-xs"
                                        src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png"
                                        alt=""
                                    />
                                </div> */}
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
                        </div>
                        <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                            <div className="absolute inset-px rounded-lg bg-white"></div>
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-indigo-600 max-lg:text-center">مجموع الحاولات</p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                        Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi.
                                    </p>
                                </div>
                                <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                                    <img
                                        className="h-[min(152px,40cqw)] object-cover"
                                        src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5"></div>
                        </div>
                        <div className="relative lg:row-span-2 max-sm:col-span-2 ">
                            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-indigo-600 max-lg:text-center">
                                        اعضاء العائلة
                                    </p>
                                    {/* <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                        <span>ID</span> الانضمام الى العايلة برقم ال
                                    </p> */}
                                    <div className='flex justify-between items-center gap-2 m-2 max-sm:flex-col'>
                                        <input
                                            id="groupId"
                                            name="groupId"
                                            type="number"
                                            placeholder="IDالانضمام الى العايلة برقم ال"
                                            aria-label="Email"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            
                                        > إنضمام</button>
                                    </div>
                                </div>
                                <div className="relative min-h-[30rem] w-full grow">
                                    <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                                        <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                                            <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                                                <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                                                    NotificationSetting.jsx
                                                </div>
                                                <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                                            </div>
                                        </div>
                                        <div className="px-6 pt-6 pb-14">{/* Your code example */}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Hero
