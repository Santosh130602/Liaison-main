import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SideBar from "./sideBar";

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [friendRequests, setFriendRequests] = useState([]);

  const fetchFriendRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/api/usersearch/notifications/friendRequests', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFriendRequests(response.data.friendRequests);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const handleAcceptRequest = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:4000/api/usersearch/notifications/friendRequests/${requestId}/accept`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchFriendRequests(); 
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:4000/api/usersearch/notifications/friendRequests/${requestId}/reject`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchFriendRequests(); 
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  const handleBack = () => {
    navigate("/"); 
  };

  return (
    <div className="flex bg-black">
      <div className="w-1/6  h-screen">
        <SideBar />
      </div>
      <div className=" notification flex-1 p-4 bg-black min-h-screen">
        <h1 className="text-2xl font-semibold mb-4 mt-16 text-white">Notifications</h1>
        <div className="">
          {friendRequests.map(request => (
            <div key={request._id} className="bg-zinc-900 p-2 m-4 mb-2 rounded-md">
              <div className="flex gap-2 mt-2 text-slate-300 justify-around">
                <p><strong>{request.requester.username}</strong> sent you a friend request.</p>
                <div className="flex gap-6">
                  <button className="bg-green-500 text-white px-3 py-1 rounded-md" onClick={() => handleAcceptRequest(request._id)}>Accept</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={() => handleRejectRequest(request._id)}>Reject</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 bg-gray-300 hover:bg-gray-500 px-4 py-2 rounded-md" onClick={handleBack}>Back to Home</button>
      </div>
    </div>

  );
};

export default NotificationsPage;
