import React, { useEffect } from 'react'
import Header from '../Header/Header'
import SearchBar from './SearchBar'
import AllStudents from './AllStudents'
import AddStudentFormule from './AddStudentFormule'
import { useState } from 'react'
import addIcon from '../../../../assets/icons/+.svg'
import arrowDownIcon from '../../../../assets/icons/dropdown.svg'
import searchIcon from '../../../../assets/icons/search.svg'
import { useNavigate } from 'react-router-dom'

function Students() {

  
// useEffect((()=>{
//   console.log(filter)
// },[filter]))

const navigate=useNavigate();
const [filter,setFilter]=useState("validated");
function handleChange(e) {
  if(!e.target.value){
setFilter("validated");
  }
  else{
    setFilter(e.target.value);
  }
  
}

  return (
    <div>
      
        {/* {isAddStudentClick
        ?
<AddStudentFormule  />
: */}
<div>
<Header title="Students" role="Admin" />
{/* <SearchBar title="student" /> */}
    <div className='search-bar'>
            <div className="input-field">
                <img src={searchIcon} alt="searchIcon" />
                <input type="text" placeholder='Search here...'/>
            </div>

            <div className="add-btns">
                <button className='new'>
                    Newest
                    <img src={arrowDownIcon} alt="arrowDown" />
                </button>
               <select name="" id="" value={filter} onChange={handleChange}>
               <option value="">Filter students</option>
                  <option value="validated">validated</option>
                  <option value="refused">refused</option>
                  <option value="pending">pending</option>
               
               </select>
                <button
                onClick={()=>{navigate('/adminpannel/NewStudent')}} className='add'>
                    <img src={addIcon} alt="addIcon" />
                    New student
                </button>
            </div>
        </div>
<AllStudents filter={filter}/>    
</div>
        {/* } */}

     
      
    </div>
  )
}

export default Students