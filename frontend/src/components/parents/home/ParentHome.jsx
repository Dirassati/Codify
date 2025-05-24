import './parenthome.css'
import SearchIcon from '../../../assets/icons/search.svg';
import NotificationIcon from '../../../assets/icons/notification.svg';
import SingleChild from './SingleChild'
import { useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom'
import { FaBell, FaSearch } from 'react-icons/fa';
import {useAuth} from '../../../contexts/AuthContext'
import axios from 'axios'

function ParentHome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [children, setChildren] = useState([]);
const {user}=useAuth();
  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true)
      try {
  const response =await axios.get(`http://localhost:5000/parents/${user.id}/children`);
console.log(response.data);

        setChildren(response.data);

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