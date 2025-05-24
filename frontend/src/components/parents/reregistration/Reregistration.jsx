import React, { useState,useEffect } from 'react'
import SearchHeader from '../SearchHeader'
import SingleChild from '../home/SingleChild'
function Reregistration() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [children,setChildren]=useState([]);

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
      student_first_name:"student1",
      student_last_name:"ss",
      student_grade:"VV"
    },
     {
      student_first_name:"student1",
      student_last_name:"ss",
      student_grade:"VV"
    },
     {
      student_first_name:"student1",
      student_last_name:"ss",
      student_grade:"VV"
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
          <p>Loading data...</p>
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
      
      <div className="search-wrappe">
        <SearchHeader />
      </div>
    
      <div className='children all-students'>

        <div className="table-wrapper">
            <h2>Re-registration</h2>
          <table>
            <thead>
              <tr>
             
                <th>Name</th>
                
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {children.map((child) => (
                <SingleChild child={child}/>
              ))}
            </tbody>
          </table>

        </div>


      </div>


    </div>
  )
}

export default Reregistration