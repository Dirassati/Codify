import { useNavigate } from 'react-router-dom';
import './searchheader.css';
import { FaBell, FaSearch } from 'react-icons/fa';
import { useEffect,useState } from 'react';

const SearchHeader = () => {
 
const [notificationCount,setNotificationCount]=useState(0);

useEffect(()=>{
    const fetchNotificationsCount = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`http://localhost:5000/api/notifications/unread-count/${idParent}`);
        console.log(res.data);

        setNotificationCount(res.data.count);

        setLoading(false)
      } catch (err) {
        console.error("Error fetching  notifs:", err)
        setError("Failed to load profile data. Please try again later.")
        setLoading(false);
      }
    }

    fetchNotificationsCount()
},[true])


  const navigate=useNavigate();
  return (

<div className="parent-header">
  <div className="ssearch-container">
    <FaSearch className="ssearch-icon" />
    <input type="text" placeholder="Search" className="ssearch-input" />
  </div>

  <button className="notification-button" onClick={() => navigate('/parent/Notifications')}>
    <div className="icon-wrapper">
      <FaBell />
      {notificationCount > 0 && (
        <span className="notification-badge">{notificationCount}</span>
      )}
    </div>
  </button>
</div>
  );
};

export default SearchHeader;
