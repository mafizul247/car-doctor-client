import React from 'react';
import useTitle from '../../../hooks/useTitle';
import Banner from '../Banner/Banner';
import About from '../About/About';
import Services from '../Services/Services';

const Home = () => {

    useTitle('Home');

    return (
        <div className='space-y-4'>
            <Banner />
            <About />
            <Services />
        </div>
    );
};

export default Home;