import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import ServiceCard from './ServiceCard';

const Services = () => {
    const location = useLocation();
    if (location.state === 'loading') {
        return <LoadingSpinner />
    }

    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('services.json')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])

    return (
        <div>
            <SectionTitle name={'Service'} title={'Our Service Area'} description={"the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable"} />
            <div className='grid grid-cols-1 md:grid-rows-2 lg:grid-cols-3 gap-4'>
                {
                    services?.map(service => <ServiceCard key={service._id} service={service} />)
                }
            </div>
        </div>
    );
};

export default Services;