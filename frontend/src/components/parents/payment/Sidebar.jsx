import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { FaHome, FaMoneyBillAlt, FaUser, FaRedo, FaSignOutAlt, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: <FaHome />, label: 'home', path: '/home' },
    { icon: <FaMoneyBillAlt />, label: 'Payment', path: '/payment' },
    { icon: <FaUser />, label: 'Profile', path: '/profile' },
    { icon: <FaRedo />, label: 'Re-registration', path: '/re-registration' },
    { icon: <FaSignOutAlt />, label: 'Log out', path: '/logout' },
    { icon: <FaCog />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src="/src/assets/images/logo1.svg" alt="Logo" className="logo" />
        <h2 className="brand-name">Dirassati</h2>
      </div>
      <ul className="sidebar-nav">
        {menuItems.map((item, index) => (
          <li key={index} className={location.pathname === item.path ? 'active' : ''}>
            <Link to={item.path} className="nav-link">
              <div className="icon-wrapper">{item.icon}</div>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
