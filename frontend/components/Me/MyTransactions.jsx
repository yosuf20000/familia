import axios from 'axios'
import React, { useEffect, useState } from 'react'
import.meta.env
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import dayjs from 'dayjs';
import { BsFillPatchQuestionFill } from "react-icons/bs";



function MyTransactions() {
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
    <div className='px-0   max-sm:w-80 lg:mx-12   '>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base text-center  font-semibold text-gray-900">تحويلاتي</h1>

        </div>

      </div>

      <div className="mt-8 flow-root  scroll-smooth overflow-x">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 max-h-screen overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-300 ">
              <thead className=''>
                <tr>
                  <th scope="col" className=" py-3.5 pr-4 pl-3 sm:pr-3 sticky top-0 bg-white  ">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th scope="col" className="sticky top-0 bg-white px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    الوقت
                  </th>
                  <th scope="col" className="sticky top-0 bg-white px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    المبلغ
                  </th>
                  <th scope="col" className=" sticky top-0 bg-white px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    الغرض
                  </th>
                  <th scope="col" className="sticky top-0 bg-white py-3.5 pr-3 pl-4 text-center text-sm font-semibold text-gray-900 sm:pl-3 z-10">
                    المجموعة
                  </th>
                  <th scope="col" className=" sticky top-0 bg-white px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    رقم الحوالة
                  </th>
                  <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white max-h-400  bg ">
                {transactions.map((transaction, index) => {
                  return (
                    <tr key={transaction.id} className="even:bg-gray-50 ">
                      <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-3">
                        <a href="#" className="text-indigo-700/30 hover:text-indigo-900 ">
                        <BsFillPatchQuestionFill /><span className="sr-only">, {transaction.id}</span>
                        </a>
                      </td>
                      <td className="px-3 py-4 text-sm text-center whitespace-nowrap text-gray-500">{dayjs(transaction.created_at).format('YYYY MMM D HH:mm')}</td>
                      <td className="px-3 py-4 text-sm text-center whitespace-nowrap text-gray-500">{transaction.amount}</td>
                      <td className="px-3 py-4 text-sm text-center whitespace-nowrap text-gray-500">{transaction.loanId}</td>
                      <td className="py-4 pr-3 pl-4 text-sm text-center font-medium whitespace-nowrap text-gray-900 sm:pl-3">
                        {transaction.groupTitle}
                      </td>
                      <td className="px-3 py-4 text-sm text-center whitespace-nowrap text-gray-500">{transaction.id}</td>

                    </tr>

                  )
                })}

              </tbody>



            </table>


          </div>

        </div>


      </div>







    </div>
  )
}

export default MyTransactions
