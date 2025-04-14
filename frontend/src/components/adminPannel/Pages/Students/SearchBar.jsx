import './searchbar.css'
import addIcon from '../../../../assets/icons/+.svg'
import arrowDownIcon from '../../../../assets/icons/dropdown.svg'
import searchIcon from '../../../../assets/icons/search.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function SearchBar({title,clicked}) {
    const [isAddStudentClicked,setIsAddStudentClicked]=useState(false);
const navigate=useNavigate();
    return (
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
                <button
                onClick={()=>{navigate('/adminpannel/NewStudent')}} className='add'>
                    <img src={addIcon} alt="addIcon" />
                    New {title}
                </button>
            </div>
        </div>
    )
}

export default SearchBar