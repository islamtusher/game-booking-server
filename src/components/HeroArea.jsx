import React, { useEffect, useState } from 'react';
import TopNavbar from './TopNavbar';
import getAccessToken from '../additional/getAccessToken';
import getUser from '../additional/getUser';

const HeroArea = ({ children }) => {
    const [profile, setProfile] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getAccessToken();
                const user = await getUser(token);
                setProfile(user)
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchData();
    }, []); // The empty dependency array means this effect runs once when the component mounts

    return (
        <div className="hero-image">
            <TopNavbar profile={profile}/>
            <div className="hero-text">
                {children}
            </div>
            
        </div>
    );
};

export default HeroArea;