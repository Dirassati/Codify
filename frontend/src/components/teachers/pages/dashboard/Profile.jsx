import { useRef, useState } from 'react';
import UseClickOutside from '../../../../functions/UseClickOutside'
import './profile.css'

function Profile(props) {

    const [showChangePassword, setShowChangePassword] = useState(false);
    return (
        <div className="profile"  >

            {
                !showChangePassword
                    ?
                    <div className="data-container">
                        <div className='profile-title'>Profile</div>
                        <div className='profile-picture'></div>
                        <div className='profile-button'>Choisir une photo</div>
                        <div className='input-container'>
                            <input type="text" placeholder='First Name' />
                            <input type="text" placeholder='Last Name' />
                        </div>

                        <div className="input">
                            <input type="text" placeholder='User Name' />
                        </div>

                        <div className="input">
                            <input type="text" placeholder='Phone Number' />
                        </div>


                        <div className="input">
                            <input type="text" placeholder='Email adress' />
                        </div>

                        <div className='change-password' onClick={() => { setShowChangePassword(true); }}>Changer le mot de passe?</div>


                        <div className="buttons">
                            <button className='annuler' onClick={props.annuler}>annuler</button>
                            <button className='confirmer'>Ajouter</button>

                        </div>
                    </div>

                    :

                    <div className=' data-container'>

                        <p>remplire les informations concernant la plateforme</p>

                        <div className="input">
                            <input type="password" placeholder='mot de passe actuel' />
                        </div>

                        <div className="input">
                            <input type="password" placeholder='nouveau mot de passe' />
                        </div>


                        <div className="input">
                            <input type="password" placeholder='confirmer le mot de passe' />
                        </div>

                        <div className="buttons">
                            <button className='annuler'  onClick={props.annuler}>annuler</button>
                            <button className='confirmer'>Ajouter</button>

                        </div>

                    </div>


            }



        </div>

    )
}

export default Profile