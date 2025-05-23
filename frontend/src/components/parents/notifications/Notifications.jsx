import './notifications.css'
import SearchHeader from '../SearchHeader'
import SingleNotification from './SingleNotification';
import { useState,useEffect } from 'react';
function Notifications() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notifications,setnotifications]=useState([]);

    useEffect(() => {
        const fetchProfileData = async () => {
          setLoading(true)
          try {
            // In a real app, this would be a fetch call to your API
            // const response = await fetch('/api/profile')
            // const data = await response.json()
    
            // Simulating API response delay
            await new Promise((resolve) => setTimeout(resolve, 800))
    
            // Sample data that would come from the API
             const notifications = [
        {
        type:"absence",
          student_first_name:"student1",
          date:"11-12-2025"
        },
         {
            type:"payment",
          student_first_name:"student1",        
         date:"11-12-2025"
        },
         {
            type:"absence",
          student_first_name:"student1",
          date:"11-12-2025"
        }
    
      ];
    
         setnotifications(notifications);
           
            setLoading(false)
          } catch (err) {
            console.error("Error fetching profile data:", err)
            setError("Failed to load profile data. Please try again later.")
            setLoading(false)
          }
        }
    
        fetchProfileData()
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
    {notifications.map((notification)=>{
      return  <SingleNotification info={notification}/>
    })}
</div>
  

      </div>
    </div>
  )
}

export default Notifications