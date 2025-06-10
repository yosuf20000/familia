import React from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'

const people = [
  {
    name: 'Lindsay Walton',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Courtney Henry',
    role: 'Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Tom Cook',
    role: 'Director of Product',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]
function AddMemebers() {
    return (
        <div>
            <div className="mx-auto max-w-lg">
                <div>
                   
                    <form action="#" className="mt-6 flex">
                        <input
                            name="email"
                            type="email"
                            placeholder="الاسم "
                            aria-label="Email address"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                        <button
                            type="submit"
                            className="ml-4 shrink-0 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            ارسل دعوة
                        </button>
                    </form>
                </div>
                <div className="mt-10">
                    <h3 className="text-sm font-medium text-gray-500">Team members previously added to projects</h3>
                    <ul role="list" className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
                        {people.map((person, personIdx) => (
                            <li key={personIdx} className="flex items-center justify-between space-x-3 py-4">
                                <div className="flex min-w-0 flex-1 items-center space-x-3">
                                    <div className="shrink-0">
                                        <img alt="" src={person.imageUrl} className="size-10 rounded-full" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-900">{person.name}</p>
                                        <p className="truncate text-sm font-medium text-gray-500">{person.role}</p>
                                    </div>
                                </div>
                                <div className="shrink-0">
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-x-1.5 text-sm/6 font-semibold text-gray-900"
                                    >
                                        <PlusIcon aria-hidden="true" className="size-5 text-gray-400" />
                                        Invite <span className="sr-only">{person.name}</span>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default AddMemebers
