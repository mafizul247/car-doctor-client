import React from 'react';
import personImage from './../../../assets/images/about_us/person.jpg'
import partsImage from './../../../assets/images/about_us/parts.jpg'
import { useLocation } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';

const About = () => {
    const location = useLocation();
    if (location.state === 'loading') {
        return <LoadingSpinner />
    }
    
    return (
        <div className="hero min-h-screen bg-base-100 rounded-lg">
            <div className="hero-content flex-col lg:flex-row">
                <div className='lg:w-1/2 relative'>
                    <img src={personImage} className="w-3/4 rounded-lg shadow-2xl" />
                    <img src={partsImage} className="w-1/2 rounded-lg shadow-2xl absolute top-1/2 right-4 border-4 border-white" />
                </div>
                <div className='lg:w-1/2 p-4 md:p-8 space-y-6'>
                    <h1 className="text-xl font-bold text-orange-500">About Us</h1>
                    <h1 className="text-5xl font-bold">We are qualified & of experience in this field</h1>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                    <p>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                    <button className="btn btn-warning">Get More Info</button>
                </div>
            </div>
        </div>
    );
};

export default About;