import { useEffect, useState } from 'react';
import axios from 'axios';

export const InvitesList = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);



  const fetchInvites = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/v1/groups/invites/my-pending`).then((res) => {
      setInvites(res.data.invites);
      console.log(res.data);

      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchInvites()
  }, []);

  const handleInviteResponse = async (inviteId, action) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/groups/invites/${inviteId}/respond`, { action });
      // Refresh invite list after action
      fetchInvites();
    } catch (err) {
      console.error(`Failed to ${action} invite`, err);
    } finally {
      setProcessingId(null);

    }
  };

  if (loading) return <p>Loading invites...</p>;

  if (invites.length === 0) return <p className="text-gray-500 text-right w-full p-4 ">لا يوجد دعوات جديدة</p>;

  return (
    <div className='p-4 flex flex-col items-end w-full '>


      <div dir='rtl' className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4  ">

        {invites.map((invite) => (
          <div
            key={invite.invite_id}
            className="border border-gray-200 rounded-xl bg-white shadow-sm p-4 transition hover:shadow-md"
          >
            <div className="flex flex-col justify-center items-center  ">

              <h3 className="text-indigo-900 font-semibold text-lg mb-1">
                دعوة للإنضمام إلى <span className="underline">{invite.group_title}</span>
              </h3>
              <p className="text-sm text-gray-700">
                الداعي :{" "}
                <span className="font-medium">
                  {invite.inviter_fname} {invite.inviter_lname}
                </span>
              </p>
              {invite.message && (
                <p className="text-sm italic text-gray-600 mt-1">
                  “{invite.message}”
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                في: {new Date(invite.created_at).toLocaleDateString()}
                {invite.expires_at && (
                  <> | Expires: {new Date(invite.expires_at).toLocaleDateString()}</>
                )}
              </p>

            </div>

            <div className="flex gap-3 mt-4 w-full  items-center justify-center">
              <button
                onClick={() => handleInviteResponse(invite.invite_id, 'accepted')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm transition"
              >
                قبول
              </button>
              <button
                onClick={() => handleInviteResponse(invite.invite_id, 'rejected')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-sm transition"
              >
                رفض
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

