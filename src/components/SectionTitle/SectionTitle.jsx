import React from 'react';

const SectionTitle = ({ name, title, description }) => {
    return (
        <div className='text-center md:w-1/2 space-y-2 mx-auto mb-4'>
            <h3 className='text-xl font-bold text-orange-600'>{name}</h3>
            <h1 className='text-3xl font-bold text-gray-800'>{title}</h1>
            <p className='text-gray-500'>{description}</p>
        </div>
    );
};

export default SectionTitle;