import './singlenotification.css'

function SingleNotification({info}) {
    return (
        <div className='single-notification'>

           
                <div className='icon'>!</div>
                <span className='report'>{info.type} Report:</span>  
                  Your son  {info.student_first_name}  was absent on {info.date}, from 9:00 AM to 12:00 PM.
                {info.type==="absence"
                ? 
                <div className='action-link'>Click Here to upload justification</div>
            :
            <div className='action-link'>Click Here for more details</div>
            }
          
           
        </div>
    )
}

export default SingleNotification