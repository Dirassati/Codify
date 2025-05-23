import { useNavigate } from 'react-router-dom';
import './searchheader.css';
import { FaBell, FaSearch } from 'react-icons/fa';

const SearchHeader = () => {
  const navigate=useNavigate();
  return (
    <div className="parent-header">
      <div className="ssearch-container">
        <FaSearch className="ssearch-icon" />
        <input type="text" placeholder="Search" className="ssearch-input" />
      </div>
      <button className="notification-button"  onClick={()=>{navigate('/parent/Notifications')}}>
        <FaBell  />
      </button>
    </div>
  );
};

export default SearchHeader;
