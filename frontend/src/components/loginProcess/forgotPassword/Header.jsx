import {useNavigate} from 'react-router-dom'

function Header() {
const navigate=useNavigate();
  function handleClick() {
    navigate('/login');
  }

  return (
    <div className='forms-header'>
<button onClick={handleClick}>Login</button>
    </div>
  )
}

export default Header