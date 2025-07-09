import React, { useEffect, useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import axios from 'axios';

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

    const [query, setQuery] = useState('m');

    const [results, setResults] = useState([]);
    const [invitedUserIds, setInvitedUserIds] = useState(new Set());
    const [title, setTitle] = useState('');




    const toggleInvite = (userId) => {
        setInvitedUserIds(prev => {
            const newSet = new Set(prev)
            if (newSet.has(userId)) {
                newSet.delete(userId); // Uninvite
            } else {
                newSet.add(userId); // Invite

            }
            return newSet;

        })
    }


    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (!query.trim()) {
                setResults([]);
                return;
            }


            axios
                .get(`${import.meta.env.VITE_API_URL}/api/v1/users/search?q=${encodeURIComponent(query)}`)
                .then(res => {
                    console.log(res.data);

                    setResults(res.data)

                })
                .catch(err => console.error('Search error:', err));
        }, 300); // debounce delay

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const handleGroupCreate = async (e) => {
        e.preventDefault()
        // setLoading(true);    // Start spinner
        // setError(null);      // Reset error state
        try {
            const res = axios.post(`${import.meta.env.VITE_API_URL}/api/v1/groups/create`, {
                invitees: [...invitedUserIds],
                title: title
            }).then(res => {
                console.log(res.data);

            })
            // setSubmitted(true)

        } catch (error) {
            setError(err.message || 'Something went wrong');

        } finally {
            // setLoading(false); // Stop spinner
            setInvitedUserIds(new Set());



        }
    }



    return (
        <form className=" w-full flex flex-col items-center ">


            <div className="mt-6 flex-wrap flex items-center justify-between ">

                
                <div className="col-span-full w-6/6  ">
                    <label htmlFor="street-address" className="block text-sm/6  text-gray-900 font-bold text-right">
                            اسم المجموعة
                        </label>
                    <div className="">
                        <input
                            id="street-address"
                            name="street-address"
                            type="text"
                            onChange={e => setTitle(e.target.value)}
                            autoComplete="street-address"
                            className="block w-full rounded-md text-center bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div className="col-span-full w-6/6   ">
                    <label htmlFor="street-address" className="block text-sm/6  text-gray-900 font-bold text-right">
                            البحث عن مشاركين
                        </label>
                    <div className="">
                        <input
                            name="email"
                            type="text"
                            placeholder="ابحث عن مشاركين "
                            aria-label="Email address"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 text-center"
                            onChange={e => setQuery(e.target.value)}
                        />
                    </div>
                </div>


                {/* <button
                        type="submit"
                        className="ml-4 shrink-0 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        ارسل دعوة
                    </button> */}
            </div>
            <div className="">
                {/* <h3 className="text-sm font-medium text-gray-500">Team members previously added to projects</h3> */}
                <ul role="list" className="mt-4   grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 mx-auto   ">
                    {results.map((user, index) => (
                        <li key={index} className="flex items-center justify-between space-x-3 py-4 ml-4 border-b-6  border-indigo-700 rounded-lg shadow-xl  mt-4">
                            <div className="flex min-w-0 flex-1 items-center space-x-3">
                                {/* <div className="shrink-0">
                                        <img alt="" src={person.imageUrl} className="size-10 rounded-full" />
                                    </div> */}
                                <div className="min-w-0 ">
                                    <p className="truncate text-sm font-medium text-gray-900 w-10 text-center">{user.ID} </p>

                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-bold text-gray-900">{user.Fname} {user.Lname} </p>
                                    <p className="truncate text-sm font-medium text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <div className="shrink-0">
                                <button
                                    type="button"
                                    className={`inline-flex items-center gap-x-1.5 text-sm/6 font-semibold text-gray-900 w-10 justify-center text-center ${invitedUserIds.has(user.ID) ? "text-indigo-800" : ""} `}
                                    onClick={() => toggleInvite(user.ID)}
                                >
                                    {/* <PlusIcon aria-hidden="true" 
                                    className={  `size-5 text-gray-400 `} /> */}
                                    {invitedUserIds.has(user.ID) ? 'تم' : 'دعوة'} <span className="sr-only">{user.fname}</span>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
            <button
                type="submit"
                className="ml-4 shrink-0 rounded-md bg-indigo-600  py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4 px-10"
                onClick={handleGroupCreate}
            >
                انشئ
            </button>
        </form>

    )
}

export default AddMemebers
