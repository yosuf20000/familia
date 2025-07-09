import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList
} from 'recharts';
import { useGroupAccess } from '../../../contexts/GroupAccessContext';

const TopContributorsChart = ({ members }) => {
            const {
                fetchMemebersStats,
                memberStats,
                loading
            } = useGroupAccess();
  // Sort and limit top 5 contributors
  const topContributors = [...memberStats]
    .sort((a, b) => b.net_contribution - a.net_contribution)
    .slice(0, 5)
    .map((m) => ({
      name: `${m.Fname} ${m.Lname}`,
      value: m.net_contribution,
    }));

  return (
    <div className="mt-10">
      <h2 className="text-lg font-bold text-indigo-900 mb-4">Top Contributors</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={topContributors}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={150} />
          <Tooltip />
          <Bar dataKey="value" fill="#312e81">
            <LabelList dataKey="value" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopContributorsChart;