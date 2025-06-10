import axios from 'axios'
import React, { useEffect, useState } from 'react'
import.meta.env
import { ChevronRightIcon } from '@heroicons/react/20/solid'

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false); // wait for session check

  useEffect(() => {
    setLoading(true)
    try {
      axios.get(`${import.meta.env.VITE_API_URL}/api/v1/transactions`)
        .then(res => {
          setTransactions(res.data)

        })
        .finally(() => {
          setLoading(false)
        })
    } catch (error) {
      console.error("Error fetching data:", error);
    }


  }, [])


  return (
    <div className='divide-y divide-gray-100 overflow-hidden bg-white shadow-xs ring-1 ring-gray-900/5 sm:rounded-xl  '>
      <div className='relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 bg-gray-100 flex-row-reverse '>


        <div className='flex min-w-10 max-w-30 w-40 justify-center  gap-x-4 max-sm:w-15 '>
          <p className="text-sm/6 font-semibold text-gray-900 max-sm:text-[12px] text-center">
            رقم الحوالة

          </p>
        </div>
        <div className='flex min-w-10 max-w-40 w-40 gap-x-4  justify-center max-sm:w-20'>
          <p className="text-sm/6 font-semibold text-gray-900 max-sm:text-[12px] text-center">
            الاسم

          </p>
        </div>
        <div className='flex min-w-10 max-w-40 w-20  justify-center gap-x-4 max-sm:w-10'>
          <p className="text-sm/6 font-semibold text-gray-900 max-sm:text-[12px] text-center">
            المبلغ

          </p>
        </div>
        <div className='flex min-w-10 max-w-40 w-20 gap-x-4 justify-center max-sm:w-10'>
          <p className="text-sm/6 font-semibold text-gray-900 max-sm:text-[12px] text-center">
            العايلة

          </p>
        </div>
        <div className='flex min-w-10 max-w-40 w-20 gap-x-4 justify-center max-sm:w-10'>
          <p className="text-sm/6 font-semibold text-gray-900 max-sm:text-[12px] text-center">
            رغم الغرض

          </p>
        </div>
        <div className='flex min-w-5 max-w-50 w-50 gap-x-4 justify-center max-sm:w-25'>
          <p className="text-sm/6 font-semibold text-gray-900 max-sm:text-[12px] text-center">
            التاريخ

          </p>
        </div>

      </div>
      <div className=''>
        {transactions.map(transaction => (
          <div className='relative flex justify-between gap-x-4 px-4 py-5 hover:bg-gray-50 sm:px-6 flex-row-reverse ' key={transaction.id}>
            <div className='flex min-w-10 max-w-30 w-30 justify-center   max-sm:mx-4  gap-x-4 max-sm:w-15 '>
              <p className="text-sm/6 font-semibold text-gray-900 min-w-20 text-center max-sm:text-[12px]  ">
                {transaction.id}

              </p>
            </div>
            <div className='flex min-w-10 max-w-40 w-40 gap-x-4  justify-center max-sm:w-20'>
              {loading ? <div class="w-full  bg-gray-200 animate-pulse rounded"></div> : <p className="text-sm/6 font-semibold text-gray-900 max-sm:text-[12px] text-center">

                {transaction.fname} {transaction.lname}

              </p>}
            </div>
            <div className='flex min-w-10 max-w-40 w-20 gap-x-4  justify-center max-sm:w-10 '>
              <p className="text-sm/6 font-semibold text-gray-900 max-sm:text-[12px] text-center ">
                {transaction.amount}

              </p>
            </div>
            <div className='flex min-w-10 max-w-40 w-20 gap-x-4 justify-center max-sm:w-10'>
              <p className="text-sm/6 font-semibold text-gray-900 max-sm:text-[12px] text-center">
                {transaction.accountId}

              </p>
            </div>
            <div className='flex min-w-10 max-w-40 w-20 gap-x-4 justify-center max-sm:w-10'>
              <p className="text-sm/6 font-semibold text-gray-900 max-sm:text-[12px]text-center">
                {transaction.loanId ? transaction.loanId : "-"}

              </p>
            </div>
            <div className='flex min-w-10 max-w-50 w-50  gap-x-4  justify-center max-sm:w-25 mx-0'>
              <p className='max-sm:text-[12px] text-center'><time dateTime={transaction.dateTime}>{transaction.created_at}</time></p>



            </div>



          </div>


        ))}
      </div>

    </div>
  )
}

export default Transactions
