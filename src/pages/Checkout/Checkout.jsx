import React, { useContext } from 'react';
import useTitle from '../../hooks/useTitle';
import { useLoaderData, useNavigation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';

const Checkout = () => {
    const navigation = useNavigation();
    if (navigation.state === 'loading') {
        return <LoadingSpinner />
    }
    useTitle('Checkout');
    const { user } = useContext(AuthContext);
    const service = useLoaderData();
    const { _id, title, price, img } = service;
    const navigate = useNavigate();

    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const date = form.date.value;
        const price = form.price.value;

        const booking = {serviceId: _id, service: title, img, customerName: name, email, bookingDate: date, price };
        fetch('https://car-doctor-ashy.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            if(data.insertedId) {
                navigate('/bookings');
                toast(`${title} has been booking`);
            }
        })
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-100 p-4 lg:p-8">
                <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h3 className='text-3xl font-bold text-orange-600 text-center'>Service Name: {service.title}</h3>
                        <form onSubmit={handleBooking}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Name</span>
                                    </label>
                                    <input type="text" name='name' defaultValue={user?.displayName} placeholder="name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Date</span>
                                    </label>
                                    <input type="date" name='date' placeholder="date" className="input input-bordered" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Email</span>
                                    </label>
                                    <input type="email" name='email' defaultValue={user?.email} placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Price</span>
                                    </label>
                                    <input type="text" name='price' defaultValue={price} placeholder="Price" className="input input-bordered" required />
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary" value="Booking" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Checkout;