import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useGroupAccess } from '../../../contexts/GroupAccessContext';

const LoansVsTransactionsPieChart = () => {
            const {
                memberStats,
            } = useGroupAccess();
  // Aggregate total loans and transactions for the group
  console.log(memberStats);
  
  const totalTransactions = memberStats.reduce((sum, m) => sum + (m.transaction_total || 0), 0);
  const totalLoans = memberStats.reduce((sum, m) => sum + (m.loan_total || 0), 0);

  const data = [
    { name: 'Transactions', value: totalTransactions },
    { name: 'Loans', value: totalLoans },
  ];

  const COLORS = ['#4f46e5', '#ef4444']; // indigo-600 and red-500

  return (
    <div className="mt-10">
      <h2 className="text-lg font-bold text-indigo-900 mb-4">Loans vs Transactions</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} SAR`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LoansVsTransactionsPieChart;