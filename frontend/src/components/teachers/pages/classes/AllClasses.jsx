import { useEffect, useState } from 'react'
import './allclasses.css'
import Classe from './Classe'
import { useNavigate } from 'react-router-dom'

function AllClasses() {
    const [loading,seLoading]=useState(false);
      const [error,setError]=useState(null);
const [classes,setClasses]=useState([])

const navigate=useNavigate();


useEffect(()=>{
//fetch

 const data = [
        {
            id:1,
            title: "2J",
            des: "math",
            date: "dimance 08:00h"
        },
        {
            id:2,
            title: "2Tm",
            des: "math",
            date: "dimance 08:00h"
        },
        {
            id:3,
            title: "2Tm",
            des: "math",
            date: "dimance 08:00h"
        },
        {
            id:4,
            title: "2Tm",
            des: "math",
            date: "dimance 08:00h"
        },
        {
            title: "2Tm",
            des: "math",
            date: "dimance 08:00h"
        },
        {
            title: "2Tm",
            des: "math",
            date: "dimance 08:00h"
        },
        {
            title: "2Tm",
            des: "math",
            date: "dimance 08:00h"
        },
        {
            title: "2Tm",
            des: "math",
            date: "dimance 08:00h"
        },
        {
            title: "2Tm",
            des: "math",
            date: "dimance 08:00h"
        },

    ]
    setClasses(data)
},[])
   


    const [index,setIndex]=useState(null)


      if (loading) {
    return (
      <div className="notes-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading semester data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="notes-container">
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
        <div className='allclasses'>

            <div className='classes-title'>
                Classes
            </div>

            <div className="classes-container">
                {
                    classes.map((item) => (
                        <div className="group-card"  onClick={()=>{navigate(`/teacher/classe/${item.id}`)}}>
                            <div className="title">{item.title}</div>
                            <div className="description">
                                <div>Description Cours: {item.des}</div>
                                <div>Data : {item.date}</div>
                            </div>
                            
                        </div>
                    ))

                }

            </div>

      
        </div>
    )
}

export default AllClasses