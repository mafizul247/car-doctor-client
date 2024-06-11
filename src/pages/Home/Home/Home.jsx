import React from 'react';
import useTitle from '../../../hooks/useTitle';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { useNavigation } from 'react-router-dom';
import Banner from '../Banner/Banner';
import About from '../About/About';
import Services from '../Services/Services';

const Home = () => {
    const navigation = useNavigation();
    if (navigation.state === 'loading') {
        return <LoadingSpinner />;
    }

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