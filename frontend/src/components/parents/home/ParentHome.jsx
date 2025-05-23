import './parenthome.css'
import SearchIcon from '../../../assets/icons/search.svg';
import NotificationIcon from '../../../assets/icons/notification.svg';
import SingleChild from './SingleChild'
import { useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom'
import { FaBell, FaSearch } from 'react-icons/fa';

function ParentHome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [children, setChildren] = useState([]);

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
        const children = [
          {
            student_first_name: "student1",
            student_last_name: "ss",
            student_grade: "VV"
          },
          {
            student_first_name: "student1",
            student_last_name: "ss",
            student_grade: "VV"
          },
          {
            student_first_name: "student1",
            student_last_name: "ss",
            student_grade: "VV"
          }

        ];

        setChildren(children);

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
          <p>Loading  data...</p>
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
    <div className='parent-home'>

      <div className="parent-header">
        <div className='parent-header'>
          <div className="ssearch-container">
            <FaSearch className="ssearch-icon" />
            <input type="text" placeholder="Search" className="ssearch-input" />
          </div>
          <button className="notification-button " onClick={() => { navigate('/parent/Notifications') }}>
            <FaBell />
          </button>
        </div>

        <button className='add-child-btn' onClick={() => { navigate('/parent/AddChildFormule') }}><AddIcon /> Add Child</button>
      </div>
      {/* <div className="search-wrappe">
            <div className="search-field">
              <div className="search-container">
                <input type="text" className="search-input" placeholder="Search" />
                <img src={SearchIcon} alt="Search" className="search-icon" />
                <div className="notification-icon" onClick={()=>{navigate('/parent/Notifications')}}>
                  <img src={NotificationIcon} alt="Notifications" />
                </div>
               
              </div>
             
            </div>
              <button className='add-child-btn' onClick={()=>{navigate('/parent/AddChildFormule')}}><AddIcon /> Add Child</button>
      </div> */}

      <div className='children all-students'>

        <div className="table-wrapper">
          <h2>My Children</h2>
          <table>
            <thead>
              <tr>

                <th>Name</th>

                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {children.map((child, index) => (
                <SingleChild key={index} child={child} />
              ))}
            </tbody>
          </table>

        </div>


      </div>


    </div>
  )
}

export default ParentHome