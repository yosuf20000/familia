import React, { useEffect } from 'react'
import { useGroupAccess } from '../../../contexts/GroupAccessContext';
import MoneyDisplay from '../../MoneyDisplay';

function MembersStats() {
        const {
            fetchMemebersStats,
            memberStats,
            loading
        } = useGroupAccess();

        

        useEffect(() => {
        fetchMemebersStats()
           

          }, [loading]);
  return (
    <div className="overflow-x-auto mt-6 mb-4">
    <h2 className="text-xl font-bold text-indigo-900 mb-4 text-right ">
      اعضاء المجموعة 
    </h2>

    <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm text-sm">
      <thead className="bg-indigo-900 text-white">
        <tr className='flex flex-row-reverse'>
          <th className="flex-1 px-4 py-2 text-center ">الاسم</th>
          <th className="flex-1 px-4 py-2 text-center  ">تاريخ الإنضمام</th>
          <th className="flex-1 px-4 py-2 text-center ">الدور</th>
          <th className="flex-1 px-4 py-2 text-center"> عدد التحويلات</th>
          <th className="flex-1 px-4 py-2 text-center">مجموع التحويلات</th>
          <th className="flex-1 px-4 py-2 text-center">القروض</th>
          <th className="flex-1 px-4 py-2 text-center">مجموع القروض</th>
          <th className="flex-1 px-4 py-2 text-center">المجوع الكلي</th>
        </tr>
      </thead>
      <tbody className="bg-white text-indigo-900 divide-y divide-gray-100">
        {memberStats.map((member) => (
          <tr className=' flex flex-row-reverse' key={member.user_id}>
            <td className="flex-1 px-4 py-2 text-center font-medium">
              {member.Fname} {member.Lname}
            </td>
            <td className="flex-1 px-4 py-2 text-center text-gray-500">
              {new Date(member.joined_date).toLocaleDateString()}
            </td>
            <td className="flex-1 px-4 py-2 text-center ">
              {member.is_leader ? (
                <span className="text-yellow-600 text-xl font-bold">👑</span>
              ) : (
                'عضو'
              )}
            </td>
            <td className="flex-1 px-4 py-2 text-center ">{member.transaction_count}</td>
            <td className="flex-1 px-4 py-2 text-center "><MoneyDisplay amount={member.transaction_total}/> </td>
            <td className="flex-1 px-4 py-2 text-center ">{member.loan_count}</td>
            <td className="flex-1 px-4 py-2 text-center "> <MoneyDisplay amount={member.loan_total} className={member.loan_total == 0 ? "!text-black" : " text-red-700"}/></td>
            <td
              className='flex-1 px-4 py-2 text-center'
            >
              <MoneyDisplay amount={member.net_contribution}/> 
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default MembersStats
