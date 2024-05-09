import React from 'react';
import './APropos.css';
import bgImage from '../assets/images/APropos.jpg';
import locateIt from '../assets/Logos/logolocateIt.png'; 
import cookapp from '../assets/Logos/logocookapp.png'
import wyw from '../assets/Logos/RondSansFond.png'
import oneimg from '../assets/Logos/one.png'

function APropos(){
    const locateItlink = "https://awsgroupe71.netlify.app"
    const cookApplink = "https://cook-app-cyan.vercel.app"
    const wywlink = "https://what-you-watched.vercel.app"
    const one = "https://onegame.vercel.app" 

    return (
        <body style={{ backgroundImage: `url(${bgImage})`, backgroundSize: '100% 100%', height:'100vh', overflow:'hidden', margin: '0', padding:'0'}}>
            <div className='container'>
                <div className='contenant'>
                    <div className='pres'>
                        Ce site à été réalisé dans le cadre d'un projet universitaire de sécurité informatique par 4 étudiants ayant une envie commune de faire un site 
                        de jeu. C'est ainsi que nous avons le plaisir de vous présenter PokeZap. 
                    </div>
                    <div className='list-item'>
                        <div className='list-text'>
                            Vous ne savez pas où nous trouver ? Cherchez nous !!! 
                        </div>
                        <div className='list-img'>
                            <a href={locateItlink} target="_blank" rel="noopener noreferrer"> {/* _blank sert à ouvrir la page dans un autre onglet; noopener empêche une page ouverte avec _blank d'emmener vers un contenu trompeur; noreferrer permet d'empécher la divulgation d'informations, c'est compatible avec une majorité de navigateurs. */}
                                <img src={locateIt} alt="LocateIt" />
                            </a>
                        </div>
                    </div>
                    <div className='list-item'>
                        <div className='list-text'>
                            Vous aimez les films et les series ? Regardez les tous !!!
                        </div>
                        <div className='list-img'>
                            <a href={wywlink} target="_blank" rel="noopener noreferrer"> 
                                <img src={wyw} alt="CookApp" />
                            </a>
                        </div>
                    </div>
                    <div className='list-item'>
                        <div className='list-text'>
                            Une envie de gouter un plat typique d'Alola?
                        </div>
                        <div className='list-img'>
                            <a href={cookApplink} target="_blank" rel="noopener noreferrer"> 
                                <img src={cookapp} alt="CookApp" />
                            </a>
                        </div>
                    </div>
                    <div className='list-item'>
                        <div className='list-text'>
                            Un différent par rapport à votre pokémon préféré ? Réglez-le !!!
                        </div>
                        <div className='list-img'>
                            <a href={one} target="_blank" rel="noopener noreferrer"> 
                                <img src={oneimg} alt="CookApp"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default APropos;
