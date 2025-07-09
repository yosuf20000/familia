import React, { useEffect } from 'react'
import { useGroupAccess } from '../../../contexts/GroupAccessContext';
import WrapTransaction from '../../Sidebar/WrapTransaction';
import MoneyDisplay from '../../MoneyDisplay';

function GroupOverview() {
    const {
        access,
        loading,
        groupname,
        groupStats,
        fetchGroupSatats,
    } = useGroupAccess();

    useEffect(() => {
        fetchGroupSatats()


    }, [loading]);
    console.log(groupStats);

    if (!groupStats) return null;

    const {
        title,
        created_at,
        leader_name,
        transaction_count,
        transaction_total,
        approved_transaction_total,
        transaction_avg,
        loan_count,
        loan_total,
        loan_avg,
        total_repaid,
        repayment_percentage,
    } = groupStats;

    const formattedDate = new Date(created_at).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md text-indigo-900 space-y-6">
            {/* Header */}
            <div className="flex flex-col items-end  sm:flex-row justify-between  sm:items-center">
                <WrapTransaction />
                <div className='flex flex-col items-center'>
                <p className="text-sm text-gray-700  sm:mt-0"> <strong>{leader_name}</strong> :👤 القائد</p>
                <p className="text-sm text-gray-500">Created on {formattedDate}</p>

                </div>
                <div>
                    <h1 className="text-3xl font-bold">📘 {title}</h1>
                </div>
            </div>


            {/* Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Transactions */}
                <div className="bg-indigo-50/0 p-4 rounded-xl shadow-sm text-black">
                    <h2 className="font-bold mb-2 text-center text-xl text-indigo-900">التحويلات</h2>
                    <p className='flex w-full justify-between'><strong>{transaction_count}</strong> :عدد الحولات</p>
                    <p className='flex w-full justify-between'><strong> <MoneyDisplay  amount={transaction_total}/> </strong> :مجوع الحوالات</p>
                    <p className='flex w-full justify-between'><strong> <MoneyDisplay  amount={approved_transaction_total}/></strong>  :المجموع الكلي للحوالات الموثقة</p>
                    <p className='flex w-full justify-between'> <strong>  <MoneyDisplay  amount={transaction_avg} /></strong>  :معدل الحوالات</p>
                </div>

                {/* Loans */}
                <div className="bg-indigo-50/0 p-4 rounded-xl shadow-sm text-black">
                    <h2 className="font-bold mb-2 text-center text-xl text-indigo-900">القروض</h2>
                    <p className='flex w-full justify-between'><strong>{loan_count}</strong> :عدد القروض</p>
                    <p className='flex w-full justify-between'><strong><MoneyDisplay className='text-red-700'  amount={loan_avg}/></strong> :معدل القروض</p>
                </div>

                {/* Repayment */}
                <div className="bg-indigo-50/0 p-4 rounded-xl shadow-sm text-black">
                    <h2 className="font-bold mb-2 text-center text-xl text-indigo-900">إعادة الدفع</h2>
                    <p className='flex w-full justify-between'><strong>{repayment_percentage}%</strong> :نسبة إعادة القروض</p>
                    <p className='flex w-full justify-between'><strong> <MoneyDisplay  amount={total_repaid}/></strong> :المجموع المدفوع للقروض</p>
                    <div className="w-full bg-white border rounded-full h-3 mt-2">
                        <div
                            className="bg-indigo-900 h-full rounded-full"
                            style={{ width: `${repayment_percentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupOverview
