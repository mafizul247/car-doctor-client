import React from 'react';
import useTitle from '../../hooks/useTitle';

const Contact = () => {
    useTitle('Contact');
    
    return (
        <div>
            <h1 className='text-5xl text-center'>Contact Page</h1>
        </div>
    );
};

export default Contact;