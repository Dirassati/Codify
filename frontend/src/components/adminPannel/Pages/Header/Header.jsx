import './header.css'
import notification from '../../../../assets/icons/notification.svg'
import parametre from '../../../../assets/icons/parametre.svg'

function Header(props) {
    return (

        <div className='headerdash'>

            <div className="left"><h2>{props.title}</h2></div>
            <div className="right">
                <div className="icon">
                    <img src={notification} alt="notification" />
                    <div className="notification-alert"></div>
                    </div>
                <div className="icon"><img src={parametre} alt="parameters" /></div>

                <div className="info">
                    <h5>Nabila .A</h5>
                    <p>Admin</p>
                </div>
                <div className='profile-picture'></div>

            </div>
        </div>
    )
}

export default Header