import React, { useEffect, useState } from 'react'
import fbackground from '../src/assets/fbackground.png'
import loginBG from '../src/assets/loginbg.png'

import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import Login from '../components/auths/SigninForm'
import TypingEffect from '../components/TypingEffect';
import SignupForm from '../components/auths/SignupForm';

const stats = [
    { name: 'Hours per week', value: '40', main: "إدارة الديون", points: ["تحديد من يَدين لمن وبأي مبلغ، بناءً على المصاريف المدفوعة من قبل كل شخص."] },
    { name: 'Paid time off', value: 'Unlimited', main: "تحليل مالي", points: [ "النظام يحسب تلقائيًا كم يجب على كل شخص أن يدفع أو يسترد."] },
    { name: 'Offices worldwide', value: '12', main: "حسابات فردية", points: ["لكل فرد حساب خاص يتم فيه تسجيل المدفوعات التي قام بها أو المبالغ التي اقترضها."] },
]

function Landing() {
    const { user, loading, setLoading, setUser } = useAuth();
    const navigate = useNavigate();
    const [count, setCount] = useState(1)

    // Set count based on current path on mount
    useEffect(() => {

        if (location.pathname === '/login') {
            if (user) {
                setCount(1);
                navigate('/', { replace: true }); // redirect back to main
            } else {
                setCount(2);

            }
        }

        if (location.pathname === '/signup') {
            if (user) {
                setCount(1);
                navigate('/', { replace: true }); // redirect back to main
            } else {
                setCount(3);

            }
        }
    }, [location.pathname]);

    // Update URL when count changes




    return (
        <div className='flex flex-row-reverse min-h-screen max-sm:flex-wrap max-md:flex-col  '>

            
            <div className="relative isolate overflow-hidden bg-white   flex-grow">
                <img
                    alt=""
                    src={fbackground }
                    className="absolute inset-0 -z-10 size-full object-cover object-top-right md:object-center"
                />

                {count == 2 && !user ? <Login /> : ""}
                {count == 3 && !user ? <SignupForm /> : ""}
                {count == 1 &&<div className=" px-6  sm:py-32 lg:px-8">
                    {count == 1 ?
                        <div className="mx-auto max-w-2xl text-center">
                            {/* <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">!انشئ مجموعتك الان</h2> */}
                            <TypingEffect />
                            <p className="mt-8 text-lg font-medium text-pretty text-gray-100 sm:text-xl/8 text-justify " dir='rtl'>
                                هو تطبيق بسيط يهدف إلى تنظيم الشؤون المالية داخل مجموعة من الأفراد (مثل أفراد العائلة أو الأصدقاء المشتركين في مصاريف). يضمن هذا النظام الشفافية والعدالة في تسجيل وتوزيع المصاريف والديون، ويعطي لكل فرد حقه بدقة.
                            </p>

                            <div className='  flex items-center  justify-end mt-4 gap-4 px-6'>

                                {!user ? <button
                                    type="button"
                                    className="rounded-md bg-white gap-x-2  px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                                    onClick={() => {
                                        if (!user) {
                                            navigate('/signup', { replace: true });
                                            setCount(3)
                                        } else {
                                            navigate('groups/create')

                                        }

                                    }}

                                >
                                    حساب جديد
                                </button> : ""}
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => {
                                        if (!user) {
                                            navigate('/login', { replace: true });
                                            setCount(2)
                                        } else {
                                            navigate('groups/create')

                                        }

                                    }}
                                >
                                    انشئ المجموعة
                                    <CheckCircleIcon aria-hidden="true" className="-mr-0.5 size-5" />
                                </button>
                            </div>
                        </div> : ""}

                    

                </div>}

                {count ==1 && <div class=" mx-auto max-w-7xl px-6 lg:px-8 ">
                    <h1 class="text-white text-3xl md:text-5xl font-bold self-start text-center w-full ">المزايا</h1>
                    <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none justify-center  ">
                        <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-1  lg:grid-cols-3  w-full  px-10 b">
                            {stats.map((stat) => (
                                <div key={stat.name} className="flex flex-col-reverse gap-1  justify-end px-10 right-0 bg-black/20 relative text-right ">
                                    <div className='flex flex-col w-full items-center justify-center max-sm:text-sm'>
                                        {stat.points.map((point, index) => {
                                            return (
                                                <div className='flex flex-row-reverse gap-2 items-center w-full'>
                                                    <dt className="text-base/7 text-gray-300   text-right ">{index + 1}</dt>
                                                    <dt className="text-base/7 text-gray-300 border-r-4 mb-2 text-right px-2" dir='rtl'>{point}</dt>
                                                </div>

                                            )
                                        })}
                                    </div>
                                    <dd className="text-2xl font-semibold tracking-tight text-center text-white max-sm:text-md">{stat.main}</dd>
                                </div>
                            ))}
                        </dl>

                    </div>

                </div>}
            </div>
        </div>
    )
}

export default Landing
