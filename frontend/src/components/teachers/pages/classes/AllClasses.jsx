import { useState } from 'react'
import './allclasses.css'
import Classe from './Classe'
import { useNavigate } from 'react-router-dom'

function AllClasses() {
const navigate=useNavigate();

    const classes = [
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


    const [index,setIndex]=useState(null)

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