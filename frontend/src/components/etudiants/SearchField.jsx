import React from 'react';
import './SearchField.css';
import SearchIcon from '../../assets/icons/search.svg';
import NotificationIcon from '../../assets/icons/notification.svg';

const SearchField = () => {
  return (
    <div className="search-field">
      <div className="search-container">
        <input type="text" className="search-input" placeholder="Search" />
        <img src={SearchIcon} alt="Search" className="search-icon" />
        <div className="notification-icon">
          <img src={NotificationIcon} alt="Notifications" />
        </div>
      </div>
    </div>
  );
};


export default SearchField;
