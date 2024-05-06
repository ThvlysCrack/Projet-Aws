import React, { useEffect } from 'react';
import './Informations.css';
import bgImage from '../../assets/images/APropos.jpg';

function Informations() {
    useEffect(() => {
        const adjustGridColumns = () => {
            const gridCells = document.querySelectorAll('.gridCell');
            gridCells.forEach(cell => {
                const value = cell.querySelector('.value');
                if (value && value.offsetWidth > cell.offsetWidth) {
                    cell.parentNode.style.gridTemplateColumns = "auto"; // Ajuste la grille sur une colonne
                }
            });
        };

        adjustGridColumns();
    }, []); // le tableau vide en second argument garantit que cela ne se produit qu'une seule fois après le montage initial
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
                                        <div className='label'><span>Pseudo</span></div>
                                        <div className='value'><span>Kama</span></div>
                                    </div>
                                    <div className='spliter'></div>
                                    <div className='gridCell'>
                                        <div className='label'><span>Titre</span></div>
                                        <div className='value'><span>Roi du pétrole</span></div>
                                    </div>
                                    <div className='spliter'></div>
                                    <div className='gridCell'>
                                        <div className='label'><span>Pseudo</span></div>
                                        <div className='value'><span>Kama</span></div>
                                    </div>
                                    <div className='spliter'></div>
                                    <div className='gridCell'>
                                        <div className='label'><span>Titre</span></div>
                                        <div className='value'><span>Roi du pétrole</span></div>
                                    </div>
                                    <div className='spliter'></div>
                                    <div className='gridCell'>
                                        <div className='label'><span>Pseudo</span></div>
                                        <div className='value'><span>Kama</span></div>
                                    </div>
                                    <div className='spliter'></div>
                                    <div className='gridCell'>
                                        <div className='label'><span>Titre</span></div>
                                        <div className='value'><span>Roi du pétrole</span></div>
                                    </div>
                                    <div className='spliter'></div>
                                    <div className='gridCell'>
                                        <div className='label'><span>Pseudo</span></div>
                                        <div className='value'><span>Kama</span></div>
                                    </div>
                                    <div className='spliter'></div>
                                    <div className='gridCell'>
                                        <div className='label'><span>Titre</span></div>
                                        <div className='value'><span>Roi du pétrole</span></div>
                                    </div>
                                </div>
                                <div className='rightSide'>
                                    <div className='gridCell'>
                                        <div className='label'><span>Date de création</span></div>
                                        <div className='value'><span>02/05/2024</span></div>
                                    </div>
                                    <div className='spliter'></div>
                                    <div className='gridCell'>
                                        <div className='label'><span>Meilleur Rang</span></div>
                                        <div className='value'><span>1</span></div>
                                    </div>
                                    <div className='spliter'></div>
                                    <div className='gridCell'>
                                        <div className='label'><span>Pseudo</span></div>
                                        <div className='value'><span>Kama</span></div>
                                    </div>
                                    <div className='spliter'></div>
                                    <div className='gridCell'>
                                        <div className='label'><span>Titre</span></div>
                                        <div className='value'><span>Roi du pétrole</span></div>
                                    </div>
                                    <div className='spliter'></div>
                                    <div className='gridCell'>
                                        <div className='label'><span>Date de création</span></div>
                                        <div className='value'><span>02/05/2024</span></div>
                                    </div>
                                    <div className='spliter'></div>
                                    <div className='gridCell'>
                                        <div className='label'><span>Meilleur Rang</span></div>
                                        <div className='value'><span>1</span></div>
                                    </div>
                                    <div className='spliter'></div>
                                    <div className='gridCell'>
                                        <div className='label'><span>Pseudo</span></div>
                                        <div className='value'><span>Kama</span></div>
                                    </div>
                                    <div className='spliter'></div>
                                    <div className='gridCell'>
                                        <div className='label'><span>Titre</span></div>
                                        <div className='value'><span>Roi du pétrole</span></div>
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