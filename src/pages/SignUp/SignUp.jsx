import React, { useContext } from 'react';
import image from './../../assets/images/login/login.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const SignUp = () => {
    useTitle('Sign Up');
    const { createUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(name, email, password);

        if (password.length < 6) {
            toast.error('Password must more then 6 charecters');
            return;
        }
        createUser(email, password)
            .then(result => {
                const logedUser = result.user;
                console.log(logedUser);
                navigate(from, { replace: true });
                toast(`${logedUser.email} Registration Successfully`);
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
                        <form onSubmit={handleSignUp}>
                            <h1 className="text-4xl font-bold text-center">Sign Up now!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                            </div>
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
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary" value="Sign Up" />
                            </div>
                        </form>
                        <p className='text-center text-gray-700'>Already have an account? <Link to='/login' className='text-orange-600 hover:underline'>Please Login</Link></p>
                        <SocialLogin />
                    </div>
                </div>
                <div className="hidden md:block">
                    <img src={image} alt="Login" />
                </div>
            </div>
        </div>
    );
};

export default SignUp;