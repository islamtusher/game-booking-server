import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

const RequireAuth = ({ children }) => {
    let location = useLocation();
    const token = localStorage.getItem('accessToken')
    // const [token, setToken] = useState('')
    const [loading, setLoading] = useState(false)
    console.log('token from auth', token)
    // setToken(localStorage.getItem('accessToken'));

    // useEffect(() => {
    //     setLoading(true)
    //     setToken(localStorage.getItem('accessToken'));
    //     setLoading(false)
    // },[])
    
    
    if (loading) {
        return <Loading></Loading>
    }
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
                                          
    return children;
};

export default RequireAuth;