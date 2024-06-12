import React, { useContext } from 'react';
import logo from './../../assets/icons/google-icon.png'
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleLogin } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleGoolgeLogin = () => {
        googleLogin()
            .then(result => {
                const logedUser = result.user;
                navigate(from, { replace: true })
                toast(`${logedUser.email} Login Successfully`);
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message);
            })
    }

    return (
        <div className='divider'>
            <img onClick={handleGoolgeLogin} className='w-12 h-12 rounded-full border-2 border-red-500 hover:border-blue-600 p-2 cursor-pointer' src={logo} alt="Goole" />
        </div>
    );
};

export default SocialLogin;