import React, { useContext } from 'react'
import MeContext from '../../contexts/MeContext';
import { h1Header, hraderStyle, meSectionStyle, transactionInfo } from '../../styles/styles';
import dayjs from 'dayjs';

function LastTransactions() {
    const {  last5Transactions, setLast5Transactions } = useContext(MeContext)

    return (
        <div className={`${meSectionStyle}`}>

            <div className={`${hraderStyle}  `}>
                <h1 className={`${h1Header}`}> اخر 5 تحويلات   </h1>

            </div>

 


                <dl dir='rtl' className=" grid grid-cols-1 w-full  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">

                    {last5Transactions.map(transaction => {
                        console.log("here");

                        const id = transaction.transaction_id
                        const amount = transaction.amount
                        const group = transaction.group_title
                        const date = transaction.created_at

                        return (
                            <div className='flex flex-col  items-center justify-between gap-x-4 gap-y-2  px-4 py-10 sm:px-6 xl:px-8  shadow-md rounded-2xl p-4 text-center mx-2 transition-transform duration-200 hover:scale-105 hover:shadow-lg  my-2 border-b-20 border-b-indigo-900/5 border-r-indigo-900/10' >
                                <div>

                                    <dt className="text-sm/6 font-medium text-gray-500 text-center w-full">
                                        رقم الحوالة
                                    </dt>

                                    <dd
                                        className={`${transactionInfo}`}

                                    >
                                        {id}
                                    </dd>
                                </div>

                                <div className='flex flex-col  gap-2'>
                                    <div>

                                        <dt className="text-sm/6 font-medium text-gray-500 text-center w-full">
                                            المبلغ
                                        </dt>

                                        <dd
                                            className={`${transactionInfo}`}

                                        >
                                            {amount}
                                        </dd>
                                    </div>

                                    <div>

                                        <dt className="text-sm/6 font-medium text-gray-500 text-center w-full">
                                            المجموعة
                                        </dt>

                                        <dd
                                            className={`${transactionInfo}`}

                                        >
                                            {group}
                                        </dd>
                                    </div>
                                </div>

                                <div>

                                    <dt className="text-sm/6 font-medium text-gray-500 text-center w-full">
                                        التاريخ
                                    </dt>

                                    <dd
                                        className={`${transactionInfo}`}

                                    >
                                        {dayjs(date).format('MMM D, YYYY • HH:mm')}
                                    </dd>
                                </div>
                            </div>

                        )
                    })}

                </dl>
         
        </div>

    )
}

export default LastTransactions
