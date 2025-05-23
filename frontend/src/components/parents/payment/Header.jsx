import './Header.css';
import { FaBell, FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="header">
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search" className="search-input" />
      </div>
      <button >
        <FaBell className="notification-button" />
      </button>
    </div>
  );
};

export default Header;
