import axios from 'axios'
import dayjs from 'dayjs'
import React, { createContext, useContext, useEffect, useState } from 'react'
import sar from '../../src/assets/sar.svg'



const Loading = createContext();

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')

}
const isNumber = (value) => {
    return typeof value === 'number' && !isNaN(value);
};
const AnimatedNumber = ({ target, duration = 1000 }) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = target / (duration / 16); // 16ms per frame (~60fps)

        const interval = setInterval(() => {
            start += increment;
            if (start >= target) {
                setValue(target);
                clearInterval(interval);
            } else {
                setValue(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(interval);
    }, [target, duration]);

    return <span>{value}</span>;
};

const StaticCom = ({ title, data, sr, more }) => {
    const { loading } = useContext(Loading);
    console.log(loading);



    return (
        <div

            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2  px-4 py-10 sm:px-6 xl:px-8  shadow-md rounded-2xl p-4 text-center mx-2 transition-transform duration-200 hover:scale-105 hover:shadow-lg  my-2 "
            

        >
            <dt className="text-sm/6 font-medium text-gray-500 text-center w-full">{title}</dt>
            <dd

                className={classNames(
                    'text-xs font-medium text-black text-right',
                )}
            >


            </dd>
            {!loading ? <dd
            className="w-full flex-none text-3xl/10 font-medium tracking-tight flex items-center gap-2 justify-center text-indigo-800 text-center "
            
            >
                {!isNumber(data) ? <AnimatedNumber target={data} /> : `${data}`} {more} {sr ? <img src={sar} alt="Logo" className='h-6' /> : ""}
            </dd> :
                <div className="flex items-center justify-center bg-gray-200 animate-pulse w-full rounded-b-full rounded-l-full py-2">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-4 text-indingo-600 font-semibold"></span>
                </div>
            }

        </div>
    )

}



export default function Statics() {
    const [stats, setStats] = useState([])
    const [last5Transactions, setLast5Transactions] = useState([])
    const [loading, setLoading] = useState(false)




    useEffect(() => {
        try {
            setLoading(true)
            axios.get(`${import.meta.env.VITE_API_URL}/api/v1/transactions/user-statics`)
                .then(res => {
                    console.log(res.data);

                    setStats(res.data)
                    setLast5Transactions(res.data.last5Tranactions)

                })
                .finally(() => {
                    setLoading(false)
                })
        } catch (error) {
            console.error("Error fetching data:", error);
        }


    }, [])

    return (
        <Loading.Provider value={{ loading }}>


            <dl className="mx-auto grid grid-cols-1 gap-px  sm:grid-cols-2 lg:grid-cols-4">
                <StaticCom
                    title={"عدد الحوالات"}
                    data={stats.basic?.total_transactions}
                />
                <StaticCom
                    title={"معدل الحوالات"}
                    data={stats.basic?.average_transaction}
                    sr={true}
                />
                <StaticCom
                    title={"مجموع الحوالات"}
                    data={stats.basic?.total_amount}
                    sr={true}
                />

                <StaticCom
                    title={"اعلى قيمة لحوالة"}
                    data={stats.basic?.largest_transaction}
                    sr={true}
                />
                <StaticCom
                    title={"أقل قيمة لحوالة"}
                    data={stats.basic?.smallest_transaction}
                    sr={true}
                />
                <StaticCom
                    title={"عدد القروض "}
                    data={stats.sumOfLoans?.loan_count}

                />
                <StaticCom
                    title={"مجموع القروض"}
                    data={stats.sumOfLoans?.total_loaned}
                    sr={true}
                />
                <StaticCom
                    title={"المجموعة التي تحوي النسبة الاكثر من التحويلات "}
                    data={stats.mostlyUsedGroup?.contribution_percent}
                    more={`% ${stats.mostlyUsedGroup?.group_title}`}
                />
                <StaticCom
                    title={"عدد الحولات للشهر الحالي"}
                    data={stats.montlyAndYearly?.transactions_this_month}
                />
                <StaticCom
                    title={"مجموع الحوالات للشهر الحالي"}
                    data={stats?.montlyAndYearly?.amount_this_month}
                    sr={true}
                />

                <div

                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2  px-4 py-6 sm:px-6 xl:px-8  sm:col-span-2 lg:col-span-4 "
                >
                    <dt className="text-sm/6 font-medium text-gray-500 text-center w-full">اخر 5 حوالات</dt>
                    <dd
                        className={classNames(
                            'text-xs font-medium text-black text-right',
                        )}
                    >
                    </dd>

                    <div className='flex flex-col  items-center justify-between w-full '>

                        {last5Transactions.map(transaction => {
                            console.log("here");

                            return (
                                <div key={transaction.transaction_id} className="px-4 py-5 sm:p-6 flex justify-between w-full items-center bg-indigo-100/5 my-2  rounded-2xl  ">
                                    {!loading ? <span className="flex items-baseline text-xl font-normal text-indigo-6000"> ID: {transaction.transaction_id}</span> :
                                        <div className="flex items-center justify-center bg-gray-200 animate-pulse w-full rounded-b-full rounded-l-full py-2">
                                            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                            <span className="ml-4 text-indingo-600 font-semibold"></span>
                                        </div>
                                    }
                                    {!loading ? <dt className="text-base font-bold  text-gray-900">{transaction.group_title}</dt> :
                                        <div className="flex items-center justify-center bg-gray-200 animate-pulse w-full rounded-b-full rounded-l-full py-2">
                                            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                            <span className="ml-4 text-indingo-600 font-semibold"></span>
                                        </div>
                                    }
                                    {!loading ? <span className="flex items-baseline text-xl font-normal text-indigo-6000">  {dayjs(transaction.created_at).format('YYYY MMM D HH:mm')}</span> :
                                        <div className="flex items-center justify-center bg-gray-200 animate-pulse w-full rounded-b-full rounded-l-full py-2">
                                            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                            <span className="ml-4 text-indingo-600 font-semibold"></span>
                                        </div>
                                    }

                                    {!loading ? <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                                        <div className="flex items-baseline text-2xl font-semibold text-indigo-800">
                                            {transaction.amount}
                                        </div>

                                        <div
                                            className={classNames(
                                                'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0',
                                            )}
                                        >



                                        </div>
                                    </dd> :
                                        <div className="flex items-center justify-center bg-gray-200 animate-pulse w-full rounded-b-full rounded-l-full py-2">
                                            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                            <span className="ml-4 text-indingo-600 font-semibold"></span>
                                        </div>
                                    }
                                </div>
                            )
                        })}

                    </div>


                </div>



            </dl>

        </Loading.Provider>
    )
}
