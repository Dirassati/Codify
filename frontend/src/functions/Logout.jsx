// src/functions/Logout.js or Logout.jsx (doesn't need to be JSX)
export const handleLogout = async (setUser, navigate) => {
  try {
    // await fetch('http://localhost:5000/logout', {
    //   method: 'POST',
    //   credentials: 'include',
    // });

    setUser(null);
    navigate('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
