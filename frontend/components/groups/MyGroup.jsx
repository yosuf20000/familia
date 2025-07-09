import React, { useEffect } from 'react'
import { useGroupAccess } from '../../contexts/GroupAccessContext'
import Last5transactionsPerGroup from './myGroupComps/Last5transactionsPerGroup';
import MembersStats from './myGroupComps/MembersStats';
import TopContributorsChart from './myGroupComps/TopContributorsChart';
import LoansVsTransactionsPieChart from './myGroupComps/LoansVsTransactionsPieChart';
import GroupOverview from './myGroupComps/GroupOverview';
import SendInvite from './myGroupComps/SendInvite';

function MyGroup() {
  const { access, loading, groupname, last5TranscationsByGroup, handleTransactionUpdateStatus, fetchLast5Transactions } = useGroupAccess();
  console.log("Rendering MyGroup")
  if (loading) return <p>Loading group...</p>;
  console.log(access);

  useEffect(() => {
    fetchLast5Transactions();
  }, [loading]);





  return (
    <div className='flex flex-col p-4  '>
      <div>
        {/* general info dev */}
        <GroupOverview/>
      </div>

      <div className="div flex flex-col  ">
        {/* detailis dev  */}
        <MembersStats />
        <Last5transactionsPerGroup />
        <SendInvite/>

      </div>
      <div className="div">
        {/* charts dev */}

        {/* <TopContributorsChart /> */}

      </div>

    </div>
  )
}

export default MyGroup
