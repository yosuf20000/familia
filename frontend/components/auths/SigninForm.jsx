import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logoImg from '../../src/assets/logo.png'



function SigninForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    // const [loading, setLoading] = useState(false); // wait for session check
    const { user, loading, setLoading, setUser } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();




    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                email,
                password
            },)
                .then(res => {
                    if (res.data?.isOk) {
                        setUser(res.data?.user)


                    }

                }).finally(() => {
                    setLoading(false)

                })



            // Choose where to store tokens
            // localStorage.setItem('accessToken', res.data.accessToken);
            // localStorage.setItem('idToken', res.data.idToken);
            // localStorage.setItem('refreshToken', res.data.refreshToken);


            // setMessage('Login successful!');


        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.error? "الايميل او الرقم السري خاطئ"  :"" || 'Login failed.');
            setLoading(false)

        }
    };
    return (
        <div className="mx-auto max-w-2xl text-center">
            {loading && <div className="flex fixed top-1 right-1 items-center justify-center h-full w-full bg-indigo-900/10 animate-pulse">
                <div className="animate-ping relative left-5 rounded-full h-20 w-20 border-t-4  border-indigo-700/10 border-opacity-50">
                </div>
                <p className='fixed text-2xl text-white animate-bounce'>غرض العايلة</p>
                <div className="animate-ping rounded-full h-10 w-10 border-t-4 border-indigo-100 border-opacity-50">
                </div>
                <div className="animate-ping rounded-full h-15 w-15 border-t-4 border-indigo-100 border-opacity-50">
                </div>
            </div>}

            <div className=' max-w-2xl flex mt-10   text-center   border-indigo-900 rounded-2xl h-full absolute  w-full   '>
                <div className=" ">
                    <h2 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl "></h2>
                    <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                    </p>


                </div>
                <form onSubmit={handleSubmit} className='flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-80  rounded-4xl  '>
                    <div className='w-full  '>


                        <div className='col-span-2 flex  items-center gap-2  w-full justify-between flex-col'>
                            <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl my-4 ">مرحبا بكم </h2>



                            <div className=' w-full mb-2 ' >
                                <div className="flex justify-end">
                                    {/* <label htmlFor="email" className="block text-sm/6 font-medium se text-gray-900">
                                الايميل
                            </label> */}
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder='youremail@ex.com'
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    aria-describedby="email-optional"
                                    className="block w-full  rounded-md border-b-6    text-base text-gray-100 placeholder:text-gray-100 bg-black/30  sm:text-md/6  p-5 focus:outline-none "
                                />
                            </div>
                            <div className='w-full'>
                                <div className="flex justify-end">
                                    {/* <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                الرقم السري
                            </label> */}
                                </div>

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="الرقم السري"
                                    required
                                    aria-describedby="email-optional"
                                    className="block w-full rounded-md  border-t-6   p-5 text-base text-gray-100 placeholder:text-gray-100  sm:text-md/6 bg-black/30 focus:outline-none"
                                />
                            </div>
                            {/* <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                                نسيت كلمة المرور
                            </a>
                        </div> */}
                            <div>
                                <button type="submit" className='flex  justify-center rounded-md bg-indigo-600/10 px-10 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2 mx-auto '>تسجيل دخول</button>
                            </div>

                            {message && <p className='text-red-300'>{message}</p>}

                        </div>

                    </div>



                </form>
            </div>
        </div>


    )
}

export default SigninForm
