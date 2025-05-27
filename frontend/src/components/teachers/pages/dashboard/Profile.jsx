import { useEffect, useState } from 'react';
import './profile.css';

function Profile(props) {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [teacherData, setTeacherData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        username: '',
        email: ''
    });


    

    // Fetch teacher data from the API
    useEffect(() => {
        fetch('http://localhost:5000/api/teachers/${user.id}/info')
            .then(res => res.json())
            .then(response => {
                if (response.status === 'success') {
                    setTeacherData(prev => ({
                        ...prev,
                        ...response.data
                    }));
                }
            })
            .catch(err => {
                console.error('Error fetching teacher data:', err);
            });
    }, []);

    return (
        <div className="profile">
            {
                !showChangePassword ? (
                    <div className="data-container">
                        <div className='profile-title'>Profile</div>
                        <div className='profile-picture'></div>
                        <div className='profile-button'>Choisir une photo</div>
                        
                        <div className='input-container'>
                            <input
                                type="text"
                                placeholder='First Name'
                                value={teacherData.first_name}
                                onChange={e => setTeacherData({ ...teacherData, first_name: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder='Last Name'
                                value={teacherData.last_name}
                                onChange={e => setTeacherData({ ...teacherData, last_name: e.target.value })}
                            />
                        </div>

                        <div className="input">
                            <input
                                type="text"
                                placeholder='User Name'
                                value={teacherData.username}
                                onChange={e => setTeacherData({ ...teacherData, username: e.target.value })}
                            />
                        </div>

                        <div className="input">
                            <input
                                type="text"
                                placeholder='Phone Number'
                                value={teacherData.phone_number}
                                onChange={e => setTeacherData({ ...teacherData, phone_number: e.target.value })}
                            />
                        </div>

                        <div className="input">
                            <input
                                type="text"
                                placeholder='Email address'
                                value={teacherData.email}
                                onChange={e => setTeacherData({ ...teacherData, email: e.target.value })}
                            />
                        </div>

                        <div className='change-password' onClick={() => setShowChangePassword(true)}>
                            Changer le mot de passe?
                        </div>

                        <div className="buttons">
                            <button className='annuler' onClick={props.annuler}>annuler</button>
                            <button className='confirmer'>Ajouter</button>
                        </div>
                    </div>
                ) : (
                    <div className='data-container'>
                        <p>remplir les informations concernant la plateforme</p>
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
                            <button className='annuler' onClick={props.annuler}>annuler</button>
                            <button className='confirmer'>Ajouter</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Profile;
