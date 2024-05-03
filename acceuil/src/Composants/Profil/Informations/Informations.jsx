import React from 'react';
import './Informations.css';
import bgImage from '../../assets/images/APropos.jpg';

function Informations() {
    return (
        <body style={{ backgroundImage: `url(${bgImage})`, backgroundSize: '100% 100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className='infoMainContainer'>
                <div className='topBorderContainer'>
                    <div><span>Mon Profil</span></div>
                </div>
                <div className='infoTabContainer'>
                    <div className='leftBorderContainer'></div>
                    <div className='profilContent'>
                        <div className='profilPictureContent'>
                            <div className='profilPicture'></div>
                        </div>
                        <div className='gridBox'>
                            <div className='gridContent'>
                                <div className='gridCell' style={{ gridRow: '1' }}>
                                    <div className='label'><span>Nom</span></div>
                                    <div className='value'><span>Kama</span></div>
                                </div>
                                <div className='gridCell2' style={{ gridRow: '1' }}>
                                    <div className='label'><span style={{marginLeft:'13%'}}>Date de creation</span></div>
                                    <div className='value'><span>02/05/2024</span></div>
                                </div>
                                <div className='gridCell' style={{ gridRow: '2' }}>
                                    <div className='label'><span>Mail</span></div>
                                    <div className='value'><span>djebbour2912@gmail.com</span></div>
                                </div>
                                <div className='gridCell2' style={{ gridRow: '2' }}>
                                    <div className='label'><span style={{marginLeft:'13%'}}>Titre</span></div>
                                    <div className='value'><span>Roi du petrole</span></div>
                                </div>
                                <div className='gridCell' style={{ gridRow: '3' }}>
                                    <div className='label'><span>Classement</span></div>
                                    <div className='value'><span>1</span></div>
                                </div>
                                <div className='gridCell2' style={{ gridRow: '3' }}>
                                    <div className='label'><span style={{marginLeft:'13%'}}>valeur</span></div>
                                    <div className='value'><span>valeur</span></div>
                                </div>
                                <div className='gridCell' style={{ gridRow: '4' }}>
                                    <div className='label'><span>valeur</span></div>
                                    <div className='value'><span>valeur</span></div>
                                </div>
                                <div className='gridCell2' style={{ gridRow: '4' }}>
                                    <div className='label'><span style={{marginLeft:'13%'}}>valeur</span></div>
                                    <div className='value'><span>valeur</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='rightBorderContainer'></div>
                </div>
                <div className='bottomBorderContainer'></div>
            </div>
        </body>
    );
}

export default Informations;