import React from 'react';
import HeroArea from '../components/HeroArea';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate()
   
    return (
        <HeroArea>
            <p>Book Your Game</p>
            <h1>LET'S ENJOY THE <span style={{color: '#4fffff'}}>GAME</span></h1>
            <button onClick={() => navigate('/slot-booking')}>Book Now</button>                    
        </HeroArea>
    );
};

export default Home;