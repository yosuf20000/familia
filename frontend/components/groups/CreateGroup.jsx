import React, { useState } from 'react'
import AddMemebers from './AddMemebers'

function CreateGroup() {
    const [title, setTitle] = useState('');

    return (
        <div className=' flex flex-col w-full items-center '>
            {/* <div className="col-span-full w-3/6  ">
                <label htmlFor="street-address" className="block text-sm/6  text-gray-900 font-bold text-right">
                    اسم المجموعة 
                </label>
                <div className="mt-2">
                    <input
                        id="street-address"
                        name="street-address"
                        type="text"
                        onChange={e => setTitle(e.target.value)}
                        autoComplete="street-address"
                        className="block w-full rounded-md text-center bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
            </div> */}
            <AddMemebers title = {title}/>
        </div>
    )
}

export default CreateGroup

