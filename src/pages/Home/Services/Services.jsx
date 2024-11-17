import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import ServiceCard from './ServiceCard';

const Services = () => {
    const navigation = useNavigation();
    if (navigation.state === 'loading') {
        return <LoadingSpinner />
    }

    const [services, setServices] = useState([]);
    const [asc, setAsc] = useState(true);
    const [search, setSearch] = useState('');
    const searchRef = useRef(null);
    // console.log(searchRef.current.value);

    useEffect(() => {
        fetch(`https://car-doctor-ashy.vercel.app/services?search=${search}&sort=${asc ? 'asc' : 'desc'}`)
            .then(res => res.json())
            .then(data => setServices(data))
    }, [asc, search])

    return (
        <div>
            <SectionTitle name={'Service'} title={'Our Service Area'} description={"the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable"} />
            <div className='my-6 flex justify-between items-center'>
                <button onClick={() => setAsc(!asc)} className='btn btn-secondary'>{asc ? 'Price Low To Hight' : 'Price Hight T Low'}</button>
                <div className="join">
                    <div>
                        <div>
                            <input ref={searchRef} className="input input-bordered join-item" placeholder="Search" />
                        </div>
                    </div>
                    <div className="indicator">
                        <button onClick={() => setSearch(searchRef.current.value) } className="btn join-item">Search</button>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    services?.map(service => <ServiceCard key={service._id} service={service} />)
                }
            </div>
        </div>
    );
};

export default Services;