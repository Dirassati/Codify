import './student.css'
import phoneIcon from '../../../../assets/icons/phone.svg'
import messageIcon from '../../../../assets/icons/message.svg'
import threedotsIcons from '../../../../assets/icons/threedots.svg'


function Student() {
    return (
        <div className='student'>
            <div>
                <input type="checkbox" />
                <div className="column info">
                    <div className='profile-picture'></div>
                    <div className="name">Samantha william</div>
                </div>
            </div>

            <div className="column id">#123456</div>
            <div className="column date">March 25 2024</div>
            <div className="column parent-name">mOhamed aek</div>
            <div className="column city">Oran</div>
            <div className="column contact">
                <img src={phoneIcon} alt="phoneIcon" />
                <img src={messageIcon} alt="messageIcon" />
            </div>
            <div className="column grade">
                VIIC
            </div>
            <div className="column action">
                <img src={threedotsIcons} alt="show more icon" />
            </div>
        </div>
    )
}

export default Student