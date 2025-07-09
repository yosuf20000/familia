import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext';
import { useGroupAccess } from '../../../contexts/GroupAccessContext';
import OrangeAlert from '../../OrangeAlert';
import GreenAlert from '../../GreenAlert';

function SendInvite() {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState('m');
    const [showAlert, setShowAlert] = useState(false);
    const [alertContent, setAlertContent] = useState(null);


    const { user } = useAuth();
    console.log(user);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (!query.trim()) {
                setResults([]);
                return;
            }


            axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/search?q=${encodeURIComponent(query)}`)
                .then(res => {
                    console.log(res.data);

                    setResults(res.data)

                })
                .catch(err => console.error('Search error:', err));
        }, 300); // debounce delay

        return () => clearTimeout(delayDebounce);
    }, [query]);

    console.log(results);
        const {
            access,
            loading,
            groupname,
            groupStats,
            fetchGroupSatats,
        } = useGroupAccess();
    

 

    const handleInviteSend = async (invitedId, message = "Welcome to the group") => {
        try {
          await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/groups/invites/send`,
             { 
                invitedId:  Number(invitedId),
                message,
                groupTitle: groupname,

                
            }).then (res => {
                console.log(res);
                const isOk = res.data.is_ok;

                if(isOk){
                    setAlertContent({
                        isOk,
                        title: isOk ? 'Invite accepted ✅' : 'Invite failed ❌',
                      });
                    setShowAlert(true); 
                    setTimeout(() => {
                        setShowAlert(false);
                        setAlertContent(null);
                      }, 10000);
                }
                
            }) 

          // Refresh invite list after action
        } catch (err) {
          console.error(`Failed to send invite `, err);
          console.log(err.response.data);
          if(!err.response.data.is_ok){
            setAlertContent({
                isOk: false,
                title: err.response.data.message,
              });
              setShowAlert(true);
              setTimeout(() => {
                setShowAlert(false);
                setAlertContent(null);
              }, 10000);
 
        }
          
        } finally {
    
        }
      };
    return (
        <form className=" w-full flex-col justify-between items-center mt-4  ">
            
      {showAlert && alertContent && (
        <div>
            {alertContent.isOk? 
            <GreenAlert
              title={alertContent.title}
              number={alertContent.number}
            /> :
            <OrangeAlert
              title={alertContent.title}

            />
            }
        </div>
      )}

            <p htmlFor="street-address" className="text-xl font-bold text-indigo-900  text-right w-full ">
                دعوة مشارك جديد
            </p>
            <div className="mt-6 flex-wrap flex items-center justify-between ">
                <div className="col-span-full w-6/6   ">
                    <div className="">
                        <input
                            name="email"
                            type="text"
                            placeholder="ابحث عن مشاركين "
                            aria-label="Email address"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 text-center"
                            onChange={e => setQuery(e.target.value)}
                        />
                    </div>
                </div>


            </div>
            <div className="">
                {/* <h3 className="text-sm font-medium text-gray-500">Team members previously added to projects</h3> */}
                <ul role="list" dir="rtl" className="mt-4   grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 mx-auto    " >
                    {results.map((groupUser, index) => (
                        <li key={index} className="flex items-center justify-between space-x-3 py-4 ml-4 border-b-6  border-indigo-700 rounded-lg shadow-xl  mt-4">
                            <div className="flex min-w-0 flex-1 items-center space-x-3">
                                {/* <div className="shrink-0">
                                <img alt="" src={person.imageUrl} className="size-10 rounded-full" />
                            </div> */}
                                <div className="min-w-0 ">
                                    <p className="truncate text-sm font-medium text-gray-900 w-10 text-center">{groupUser.ID} </p>

                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-bold text-gray-900">{groupUser.Fname} {groupUser.Lname} </p>
                                    <p className="truncate text-sm font-medium text-gray-500">{groupUser.email}</p>
                                </div>
                            </div>
                            <div className="shrink-0 px-4">
                                <button
                                    type="button"
                                    onClick={() => handleInviteSend(groupUser.ID)}

                                    className={`inline-flex items-center gap-x-1.5 text-sm/6 font-semibold text-gray-900 w-10 justify-center text-center   `}
                                // onClick={() => toggleInvite(groupUser.ID)}
                                >
                                    {/* <PlusIcon aria-hidden="true" 
                            className={  `size-5 text-gray-400 `} /> */}
                                    <span className="sr-only">{groupUser.fname}</span>
                                    دعوة
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>

        </form>
    )
}

export default SendInvite
