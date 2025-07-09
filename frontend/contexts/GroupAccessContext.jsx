import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const GroupAccessContext = createContext();
export const useGroupAccess = () => useContext(GroupAccessContext);

export const GroupAccessProvider = ({ children }) => {
  const { groupname } = useParams();     // grab the dynamic part from URL
  const navigate = useNavigate();
  const [access, setAccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [last5TranscationsByGroup, setLast5TranscationsByGroup] = useState([]);
  const [memberStats, setMemberStats] = useState([]);
  const [groupStats, setGroupStats] = useState([]);
  const [amount, setAmount] = useState('');
  const [userLoan, setUserLoan] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [openDialog, setOpenDialgo] = useState(false)
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('m');
  const [results, setResults] = useState([]);
  







// featchers 

  const fetchLast5Transactions = async () => {
    try {
      axios.get(`${import.meta.env.VITE_API_URL}/api/v1/statics/last5/${groupname}`)
        .then(res => {
          setLast5TranscationsByGroup(res.data?.last5TranscationsByGroup);
        }).catch(error => {
          console.error('Group access error:', error);
        })
        .finally(() => {
          setLoading(false)
        })
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log("here");
    }
  };

  const fetchMemebersStats = async () => {
    try {
      axios.get(`${import.meta.env.VITE_API_URL}/api/v1/statics/members-stats/${groupname}`)
        .then(res => {
          console.log(res.data.membersStats);

          setMemberStats(res.data.membersStats);
        }).catch(error => {
          console.error('Group access error:', error);
        })
        .finally(() => {
          setLoading(false)
        })
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log("here");
    }

  }

  const fetchGroupSatats = async () => {
    try {
      axios.get(`${import.meta.env.VITE_API_URL}/api/v1/statics/group-stats/${groupname}`)
        .then(res => {

          console.log(res.data.indivdualGroupStats);
          setGroupStats(res.data?.indivdualGroupStats)

          //  setMemberStats(res.data.membersStats);
        }).catch(error => {
          console.error('Group access error:', error);
        })
        .finally(() => {
          setLoading(false)
        })
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log("here");
    }

  }



// use effects
  useEffect(() => {
    console.log(groupname);

    if (!groupname) return;


    try {
      axios.get(`${import.meta.env.VITE_API_URL}/api/v1/groups/${groupname}/access`)
        .then(res => {
          console.log(res.data);
          if (!res.data.groupUserInfo.is_member) {
            navigate('/groups'); // user is not a member

          } else {
            // setAccess(res.data); // includes is_leader and group_id
            setAccess(res.data.groupUserInfo);
          }


        }).catch(error => {
          console.error('Group access error:', error);
          // could be 404, 401, or network issue
          navigate('/groups');
        })
        .finally(() => {
          setLoading(false)
        })

      try {
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/loans/user`)
          .then(res => {
            setUserLoan(res.data)



          })
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log("here");

      navigate('/groups');

    }

  }, [groupname]);




// post function 

  const handleTransactionUpdateStatus = async (e, transactionId, newStatus) => {
    e.preventDefault()
    setLoading(true);    // Start spinner
    try {
      axios.post(`${import.meta.env.VITE_API_URL}/api/v1/transactions/approve-transaction`, {
        transactionId,
        is_ok: newStatus

      })

      await fetchLast5Transactions(); // Refresh after update
      await fetchGroupSatats()


    } catch (error) {

    } finally {
      setLoading(false); // Stop spinner

    }
  }

  const handleTransactionSubmit = async (e, amount) => {
    e.preventDefault()
    setLoading(true);    // Start spinner
    setError(null);      // Reset error state
    try {
      axios.post(`${import.meta.env.VITE_API_URL}/api/v1/transactions/make`, {
        amount: Number(amount),
        loanId: userLoan[0]?.id || null,
        accountId: access.group_id
      })
      setSubmitted(true)
      await fetchLast5Transactions(); // Refresh after update
      await fetchGroupSatats()

    } catch (error) {
      setError(err.message || 'Something went wrong');

    } finally {
      setLoading(false); // Stop spinner

    }
  }


  return (
    <GroupAccessContext.Provider value={{
      access,
      loading,
      groupname,

      last5TranscationsByGroup,
      fetchLast5Transactions,

      memberStats,
      fetchMemebersStats,
      groupStats,
      fetchGroupSatats,

      handleTransactionUpdateStatus,
      handleTransactionSubmit,
      openDialog,
      setOpenDialgo,
      submitted,
      setSubmitted,
      userLoan,
      error
      


    }}>
      {children}
    </GroupAccessContext.Provider>
  );
};