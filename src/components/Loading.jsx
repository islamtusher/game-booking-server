import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
    return (
        <div className='d-flex align-items-center justify-content-center bg-light' style={{height:'100vh'}}>
             <Spinner animation="grow" variant="primary" />
        </div>
    )
};

export default Loading;