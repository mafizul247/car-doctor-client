import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    const {_id, title, img, price} = service;
    
    return (
        <div className="card card-compact w-full bg-base-100 shadow-xl">
            <figure><img src={img} alt={title} className='h-56 w-full' /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className='text-orange-600 font-semibold'>Price: ${price}</p>
                <div className="card-actions">
                    <Link to={`/checkout/${_id}`} className="btn btn-warning">Book Now</Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;