import React from 'react';

const InputError = ({message}) => {
    return <p className='p-0 pt-1 text-danger' style={{fontSize:'15px'}}>{message}</p>
};

export default InputError;