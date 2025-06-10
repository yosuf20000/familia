import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logoImg from '../../src/assets/logo.png'



function SigninForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    // const [loading, setLoading] = useState(false); // wait for session check
    const { user, loading, setLoading, setUser } = useAuth();

    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await axios.post('http://localhost:3000/auth/login', {
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
            setMessage(err.response?.data?.error || 'Login failed.');
            setLoading(false)

        }
    };
    return (
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">!انشئ مجموعتك الان</h2>
            <div className='mx-auto max-w-2xl   text-center   border-indigo-900 rounded-2xl h-full   '>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl "></h2>
                    <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                    </p>

                </div>
                <form onSubmit={handleSubmit} className='flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-80'>
                    <div className='w-full max-w-sm space-y-10"'>
                        <div>
                            <img
                                alt="Your Company"
                                src={logoImg}
                                className="mx-auto h-10 w-auto"
                            />
                            <h2 className="mt-10 text-center text-xl  tracking-tight text-gray-900 mb-2">
                                سجل دخول الى حسابك
                            </h2>
                        </div>

                        <div className='col-span-2'>



                            <div className='' >
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
                                    className="block w-full rounded-t-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            <div>
                                <div className="flex justify-end">
                                    {/* <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                الرقم السري
                            </label> */}
                                </div>

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                    aria-describedby="email-optional"
                                    className="block w-full rounded-b-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mt-1"
                                />
                            </div>
                            {/* <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                                نسيت كلمة المرور
                            </a>
                        </div> */}
                            <div>
                                <button type="submit" className='flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2 mx-auto '>تسجيل دخول</button>
                            </div>

                        </div>

                    </div>


                    {message && <p>{message}</p>}
                </form>
            </div>
        </div>


    )
}

export default SigninForm
