import React, { useContext } from 'react';
import image from './../../assets/images/login/login.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';

const Login = () => {
    useTitle('Login');
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        if (password.length < 6) {
            toast.error('Password must more then 6 charecters');
            return;
        }
        signIn(email, password)
            .then(result => {
                const logedUser = result.user;
                console.log(logedUser);
                navigate(from, { replace: true });
                toast(`${logedUser.email} Login Successfully`);
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse gap-6">
                <div className="card shrink-0 lg:w-1/2 shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <h1 className="text-4xl font-bold text-center">Login now!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary" value="Login" />
                            </div>
                        </form>
                        <p className='text-center text-gray-700'>Don't have an account? <Link to='/sign-up' state={location.state} className='text-orange-600 hover:underline'>Please Sign Up</Link></p>
                    </div>
                </div>
                <div className="hidden md:block">
                    <img src={image} alt="Login" />
                </div>
            </div>
        </div>
    );
};

export default Login;