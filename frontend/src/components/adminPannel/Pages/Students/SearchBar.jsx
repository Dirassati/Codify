import './searchbar.css'
import addIcon from '../../../../assets/icons/+.svg'
import arrowDownIcon from '../../../../assets/icons/dropdown.svg'
import searchIcon from '../../../../assets/icons/search.svg'
import { useNavigate } from 'react-router-dom';

function SearchBar(props) {
    const navigate = useNavigate();
    const handleClick = () => {
        if(props.title==='teacher'){
            navigate('/adminpannel/Teachers/add');

        }

      };


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
                <button className='add' onClick={handleClick}>
                    <img src={addIcon} alt="addIcon" />
                    New {props.title}
                </button>
            </div>
        </div>
    )
}

export default SearchBar
