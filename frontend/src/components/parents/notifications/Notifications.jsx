import './notifications.css'
import SearchHeader from '../SearchHeader'
import SingleNotification from './SingleNotification';
import { useState, useEffect } from 'react';
import axios from 'axios'
function Notifications() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notifications, setnotifications] = useState([]);
  const idParent=132;

  useEffect(() => {
    // const fetchProfileData = async () => {
    //   setLoading(true)
    //   try {
    //     const res = await axios.get(`http://localhost:5000/api/notifications/${idParent}`);
    //     console.log(res.data);

    //     setnotifications(res.data.data);

    //     setLoading(false)
    //   } catch (err) {
    //     console.error("Error fetching profile data:", err)
    //     setError("Failed to load profile data. Please try again later.")
    //     setLoading(false);
    //   }
    // }

    // fetchProfileData()
    setnotifications([
      {},{},{},{}
    ]);
    setLoading(false)
  }, [])



  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Notifications...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='notifications'>
      <div className="search-wrappe">
        <SearchHeader />
      </div>

      <div className="notifications-wrapper">
        <h2>Notifications</h2>
        <div className="natifications-container">
          {notifications.map((notification) => {
            return <SingleNotification info={notification} />
          })}
        </div>


      </div>
    </div>
  )
}

export default Notifications