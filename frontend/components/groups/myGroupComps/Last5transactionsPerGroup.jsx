import React from 'react'
import { useGroupAccess } from '../../../contexts/GroupAccessContext';
import MoneyDisplay from '../../MoneyDisplay';


function Last5transactionsPerGroup() {
    const {
        access, loading, last5TranscationsByGroup, handleTransactionUpdateStatus,
    } = useGroupAccess();
    return (
        <div className="bg-white rounded-2xl shadow-md p-6 w-full mx-auto ">
        <h2 className="text-2xl font-semibold text-indigo-900 mb-4 text-right">
          اخر 5 تحويلات 
        </h2>
        <ul className="space-y-4">
          {last5TranscationsByGroup.map((tx) => (
            <li
            key={tx.transaction_id}
            className=" border-indigo-100 rounded-xl p-4  hover:bg-indigo-100/10 transition"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              {/* Left: Main Info */}
              <div className="text-indigo-900">
                <p className="text-lg font-bold">
                    <MoneyDisplay amount={tx.amount}  />
                  💰 
                </p>
                <p className="text-sm text-indigo-800">
                  {tx.created_at.slice(0, 10)} —{' '}
                  <span className="italic">{tx.group_title}</span>
                </p>
              </div>
                <p className="text-sm mt-1 text-gray-700 font-bold">
                  👤 {tx.Fname} {tx.Lname || ''}
                </p>

              {/* Right: Tags & Status */}
              <div className="mt-2 sm:mt-0 flex flex-col gap-2 sm:items-end">
                {tx.loan_id ? (
                  <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                   (ID: {tx.loan_id})  دفع غرض 
                  </span>
                ) : (
                  <span className="text-xs font-semibold bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    Contribution
                  </span>
                )}

                {/* Approval status — editable if leader */}
                {access?.is_leader ===1 ? (
                  <button
                    disabled={loading}

                    onClick={(e) =>{
                      console.log(tx.transaction_id);
                      
                      handleTransactionUpdateStatus(e,tx.transaction_id, tx.is_ok ? 0 : 1 )

                    }}
                    className={`text-xs font-semibold px-3 py-1 rounded-full transition ${
                      tx.is_ok
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {tx.is_ok ? '✅ حوالة موثقة ' : '❌  (اضغط للتوثيق)'}
                  </button>
                ) : (
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      tx.is_ok
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {tx.is_ok ? '✅ Approved' : '❌ Not Approved'}
                  </span>
                )}
              </div>
            </div>
          </li>
          ))}
        </ul>
      </div>
    );
}

export default Last5transactionsPerGroup
