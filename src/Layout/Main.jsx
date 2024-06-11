import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import NavBar from '../pages/Shared/NavBar/NavBar';

const Main = () => {
    const location = useLocation();
    // console.log(location.pathname);
    const noFooter= location.pathname === '/login' || location.pathname === '/sign-up';
    return (
        <div>
            <NavBar />
            <div className='min-h-[calc(100vh-50px)] max-w-screen-xl mx-auto px-4 md:px-8'>
                <Outlet />
            </div>
            {noFooter || <Footer />}
        </div>
    );
};

export default Main;