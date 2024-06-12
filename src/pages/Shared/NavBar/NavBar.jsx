import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from './../../../assets/logo.svg'
import { AuthContext } from '../../../providers/AuthProvider';
import { toast } from 'react-toastify';

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);

    const hangleLogOut = () => {
        logOut()
            .then(() => {
                toast('Logout Succefully');
            }).catch(error => {
                console.log(error);
                toast.error(error.message);
            })
    }

    const navItems = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/contact'>Contact</NavLink></li>
        {
            user && user?.email ? <>
                <li><NavLink to='/bookings'>My Bookings</NavLink></li>
                <li><button onClick={hangleLogOut}>LogOut</button></li>
            </> : <>
                <li><NavLink to='/login'>Login</NavLink></li>
            </>
        }

    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Link to='/'>
                    <img className='h-16' src={logo} alt="Logo" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                <Link className="btn btn-outline btn-secondary">Appointment</Link>
            </div>
        </div>
    );
};

export default NavBar;