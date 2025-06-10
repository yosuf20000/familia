import React, { useState } from 'react'
import axios from 'axios';

function SignupForm() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        fname: "",
        lname: ""
    });
    const [error, setError] = useState('');


    const [message, setMessage] = useState('');

    const handleChange = e => {
        setForm(
            {
                ...form,
                [e.target.name]: e.target.value
            }
        );
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', form);
            setMessage('Signup successful! Check your email for confirmation.');
        } catch (err) {
            console.error(err);
            setMessage('فشل التسجيل');
        }
    };



    return (

        <div className="flex flex-col   justify-center items-center gap-4 p-4 rounded-xl">
            <div className="  my-4 ">
                
                <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    تسجيل حساب جديد
                </h2>
            </div>

            <div className=" ">
                <form onSubmit={handleSubmit} className="space-y-6 flex w-full flex-wrap items-center gap-2 flex-row-reverse   " >
                    <div >
                        <div className="flex justify-end">
                            <label htmlFor="email" className="block text-sm/6 font-medium se text-gray-900">
                                الايميل
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="youremail@example.com"
                                onChange={handleChange}
                                required
                                aria-describedby="email-optional"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-end">
                            <label htmlFor="fname" className="block text-sm/6 font-medium text-gray-900">
                                الاسم الاول
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id='fname'
                                type="text"
                                name="fname"
                                placeholder="محمد"
                                onChange={handleChange}
                                required
                                aria-describedby="email-optional"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-end">
                            <label htmlFor="lname" className="block text-sm/6 font-medium  text-gray-900">
                                الاسم الاخير
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id='lname'
                                type="text"
                                name="lname"
                                placeholder="الصويلح"
                                onChange={handleChange}
                                required
                                aria-describedby="email-optional"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-end">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                الرقم السري
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id='password'
                                type="password"
                                name="password"
                                placeholder="**********"
                                onChange={handleChange}
                                required
                                aria-describedby="email-optional"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mt-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            تسجيل
                        </button>
                    </div>

                </form>
                {message && <p className='p-2 bg-red-200'>{message}</p>}


            </div>
        </div>


    )
}

export default SignupForm
