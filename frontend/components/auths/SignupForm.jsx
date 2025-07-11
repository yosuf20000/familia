import React, { useState } from 'react'
import axios from 'axios';
import { inputStyle } from '../../styles/styles';

function SignupForm() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        fname: "",
        lname: "",
        username: ""
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
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, form);
            setMessage('Signup successful! Check your email for confirmation.');
        } catch (err) {
            console.error(err);
            setMessage('فشل التسجيل');
        }
    };



    return (

        <div className="flex flex-col   justify-center items-center gap-4 p-4 rounded-xl w-full  min-h-screen ">
            <div className="  my-4 ">
                
                <h2 className="text-center text-2xl/9 font-bold tracking-tight text-white">
                    تسجيل حساب جديد
                </h2>
            </div>

            
                <form onSubmit={handleSubmit} className="space-y-6 xl:w-4/6 grid grid-cols-2 max-sm:grid-cols-1 gap-4 w-full   "  dir='rtl'>

                    <div>
                        {/* <div className="flex justify-end">
                            <label htmlFor="fname" className="block text-sm/6 font-medium text-gray-900">
                                الاسم الاول
                            </label>
                        </div> */}
                        <div className="mt-2">
                            <input
                                id='fname'
                                type="text"
                                name="fname"
                                placeholder="الاسم الاول"
                                onChange={handleChange}
                                required
                                aria-describedby="email-optional"
                                className={`${inputStyle} `}
                            />
                        </div>
                    </div>
                    <div>
                        {/* <div className="flex justify-end">
                            <label htmlFor="lname" className="block text-sm/6 font-medium  text-gray-900">
                                الاسم الاخير
                            </label>
                        </div> */}
                        <div className="mt-2">
                            <input
                                id='lname'
                                type="text"
                                name="lname"
                                placeholder="الاسم الاخير"
                                onChange={handleChange}
                                required
                                aria-describedby="email-optional"
                                className={`${inputStyle} `}
                            />
                        </div>
                    </div>
                    <div >
                        {/* <div className="flex justify-end">
                            <label htmlFor="email" className="block text-sm/6 font-medium se text-gray-900">
                                الايميل
                            </label>
                        </div> */}
                        <div className="mt-2">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="youremail@example.com"
                                onChange={handleChange}
                                required
                                aria-describedby="email-optional"
                                className={`${inputStyle} `}
                            />
                        </div>
                    </div>
                    <div >
                        {/* <div className="flex justify-end">
                            <label htmlFor="email" className="block text-sm/6 font-medium se text-gray-900">
                                الايميل
                            </label>
                        </div> */}
                        <div className="mt-2">
                            <input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="اسم المستخدم"
                                onChange={handleChange}
                                required
                                aria-describedby="email-optional"
                                className={`${inputStyle} `}
                            />
                        </div>
                    </div>
                    <div>
                        {/* <div className="flex justify-end">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                الرقم السري
                            </label>
                        </div> */}
                        <div className="mt-2">
                            <input
                                id='password'
                                type="password"
                                name="password"
                                placeholder="**********"
                                onChange={handleChange}
                                required
                                aria-describedby="email-optional"
                                className={`${inputStyle} `}
                            />
                        </div>
                    </div>
                    <div className='md:col-span-2'>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-white/80 px-3 py-1.5 mt-2 text-sm/6 font-semibold text-indigo-900 shadow-xs hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                        >
                            تسجيل
                        </button>
                    </div>

                </form>
                {message && <p className='p-2 bg-red-200'>{message}</p>}


          
        </div>


    )
}

export default SignupForm
