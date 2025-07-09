import React, { useContext, useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { GiPayMoney } from "react-icons/gi";

import sar from '../src/assets/sar.svg'
import axios from 'axios'
import Context from '../sections/Context';
import { SelectedGroupContext } from './Layout';
import { useGroupAccess } from '../contexts/GroupAccessContext';
function AddTransaction({}) {
    const [amount, setAmount] = useState('');
    // const [userLoan, setUserLoan] = useState([]);
    // const [submitted, setSubmitted] = useState(false);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

        const {
            handleTransactionSubmit,
            loading,
            submitted,
            userLoan,
            error,
            openDialog,
            setOpenDialgo


        } = useGroupAccess();


    

    const handleChangeAmount = (e) => {
        const newAmount = e.target.value;
        // Allow only digits (optionally empty string)
        if (/^\d*$/.test(newAmount)) {
            setAmount(newAmount);
        }
    };


    // done 





    return (
        <Dialog open={openDialog} onClose={setOpenDialgo} className="relative  z-100">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in flex items-start justify-start p-4 max-sm:items-end"
            >
                <p className='my-20 text-white text-2xl bg-indigo-500/60 p-4 rounded-sm text-center w-3/5 max-lg:w-4/4 max-md:w-4/4    border-b-10 max-sm:mb-80'>
                <span className='block mb-2'>(بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ)</span>
                 وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَى وَلا تَعَاوَنُوا عَلَى الإثْمِ وَالْعُدْوَانِ
                </ p>
                
                
                
            </DialogBackdrop>

            <form className="fixed inset-0 z-10 w-screen overflow-y-auto h" onSubmit={(e) => {
                handleTransactionSubmit(e, amount)


            }}>
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div>
                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gray-100">

                                <GiPayMoney className='text-4xl text-indigo-700' />
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                    حوالة جديدة
                                </DialogTitle>

                            </div>
                        </div>
                        <div className='mt-2'>
                            <div>
                                <label htmlFor="price" className="block text-sm/6 font-bold text-gray-900  text-right ">
                                    المبلغ
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">

                                        <input
                                            id="price"
                                            name="price"
                                            type="text"
                                            value={amount}
                                            onChange={handleChangeAmount}
                                            placeholder="0.00"
                                            aria-describedby="price-currency"
                                            className="block min-w-0 grow py-1.5 pr-3 pl-5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                        />
                                        <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                                            <img src={sar} alt="Logo" className='h-4' />
                                        </div>
                                    </div>

                                </div>
                                <div className='mt-2'>
                                    {userLoan[0]?.id && <p className="text-sm text-gray-500 text-center">
                                        يوجد عليك غرض برقم<span className='font-bold text-indigo-500 text-md'> {userLoan[0]?.id}245 </span> بقيمة <span className='font-bold text-indigo-700 text-md'>{userLoan[0]?.amount}</span> سيتم استخدام هذا المبلغ للسداد


                                    </p>}

                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                            <button
                                type="submit"

                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={loading}
                            >
                                توثيق
                                {loading && <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent mx-auto"></div>}

                            </button>
                            {submitted &&<p className="text-green-800 text-center">تم توثيق الحوالة </p>}
                            {error && <p className="text-red-500">Error: {error}</p>}

                        </div>

                    </DialogPanel>
                </div>
            </form>
        </Dialog>
    )
}

export default AddTransaction
