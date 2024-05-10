import React, { useEffect, useState } from 'react';
import './Informations.css';
import axios from 'axios';
import bgImage from '../../assets/images/APropos.jpg';

async function getProfilInformation(userId) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://pokezapserver.vercel.app/userProfil/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des informations du profil :", error.response.data.error);
        return null;
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function Informations() {
    const [profilInfo, setProfilInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                console.log(userId)
                let userInfo = JSON.parse(localStorage.getItem('profilInfo'));
                console.log(userInfo)
                if (userInfo.length!=0 || !userInfo) {
                    userInfo = await getProfilInformation(userId);
                    console.log(userInfo)
                    localStorage.setItem('profilInfo', JSON.stringify(userInfo));
                }
                //console.log(localStorage.getItem('profilInfo'))
                setProfilInfo(userInfo);
            } catch (error) {
                console.error("Erreur lors de la récupération du profil du joueur :", error);
            }
        };
        fetchData();
        console.log(profilInfo)
    }, []);

    useEffect(() => {
        const adjustGridColumns = () => {
            const gridCells = document.querySelectorAll('.gridCell');
            gridCells.forEach(cell => {
                const value = cell.querySelector('.value');
                if (value && value.offsetWidth > cell.offsetWidth) {
                    cell.parentNode.style.gridTemplateColumns = "auto";
                }
            });
        };
        adjustGridColumns();
    }, []);

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
                                <div className='leftSide'>
                                    <div className='gridCell'>
                                        <div className='label'><span>Pseudo </span></div>
                                        <div className='value'><span> {profilInfo ? profilInfo.pseudo : ""} </span></div>
                                    </div>
                                    <div className='spliter'></div>
                                    <div className='gridCell'>
                                        <div className='label'><span>Titre</span></div>
                                        <div className='value'><span>{profilInfo ? profilInfo.title : ""}</span></div>
                                    </div>
                                    <div className='spliter'></div>
                                    <div className='gridCell'>
                                        <div className='label'><span>Date de création</span></div>
                                        <div className='value'><span>{profilInfo ? formatDate(profilInfo.createdAt) : ""}</span></div>
                                    </div>
                                    <div className='spliter'></div>
                                </div>
                                <div className='rightSide'>
                                    <div className='gridCell'>
                                        <div className='label'><span>Meilleur Rang</span></div>
                                        <div className='value'><span>{profilInfo ? (profilInfo.bestRank !== 0 ? profilInfo.bestRank : "N'a jamais joué") : ""}</span></div>
                                    </div>
                                    <div className='spliter'></div>
                                    <div className='gridCell'>
                                        <div className='label'><span>Jeu Classique</span></div>
                                        <div className='value'><span>{profilInfo ? profilInfo.classicScore : ""} tentatives</span></div>
                                    </div>
                                    <div className='spliter'></div>
                                    <div className='gridCell'>
                                        <div className='label'><span> Jeu Silouhette</span></div>
                                        <div className='value'><span>{profilInfo ? profilInfo.silouhetteScore : ""} tentatives</span></div>
                                    </div>
                                    <div className='spliter'></div>
                                    <div className='gridCell'>
                                        <div className='label'><span>Jeu Description</span></div>
                                        <div className='value'><span>{profilInfo ? profilInfo.descriptionScore : ""} tentatives</span></div>
                                    </div>
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
