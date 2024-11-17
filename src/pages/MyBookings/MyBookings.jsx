import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useTitle from '../../hooks/useTitle';

const MyBookings = () => {
    const navigation = useNavigation();
    if (navigation.state === 'loading') {
        return <LoadingSpinner />
    }

    useTitle('My Booking');
    const { user, logOut } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('car-access-token');

    useEffect(() => {
        fetch(`https://car-doctor-ashy.vercel.app/bookings?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setBookings(data);
                } else {
                    logOut();
                    navigate('/');
                }
            })
    }, [user, token, logOut, navigate])

    const handleDelete = (booking) => {
        Swal.fire({
            title: `Are you sure delete ${booking.service}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://car-doctor-ashy.vercel.app/bookings/${booking._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.deletedCount > 0) {
                            const remaining = bookings.filter(book => book._id !== booking._id);
                            setBookings(remaining);
                            toast('Your Booking Deleted Successfully')
                        }
                    })
            }
        });
    }

    const handleBookingConfirm = (booking) => {
        Swal.fire({
            title: `Are you sure confirm ${booking.service}?`,
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://car-doctor-ashy.vercel.app/bookings/${booking._id}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ status: 'confirm' })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.modifiedCount > 0) {
                            const remaining = bookings.filter(book => book._id !== booking._id);
                            const updateBooking = bookings.find(book => book._id === booking._id);
                            updateBooking.status = 'confirm';
                            // console.log(updateBooking);
                            // console.log(remaining);
                            const newBooking = [updateBooking, ...remaining]
                            setBookings(newBooking);
                            toast('Your Booking Confirm Successfully')
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service Name</th>
                            <th>Booking Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {bookings?.map((booking, index) => (
                            <tr key={booking._id}>
                                <td>
                                    <button onClick={() => handleDelete(booking)} className="btn btn-circle btn-outline btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={booking.img && booking.img} alt="Booking" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{booking.service}</td>
                                <td>{booking.bookingDate}</td>
                                <td>{booking.price}</td>
                                <td>
                                    {
                                        booking.status === 'confirm' ? <>
                                            <button className="btn btn-success btn-xs">{booking.status}</button>
                                        </> : <>
                                            <button onClick={() => handleBookingConfirm(booking)} className="btn btn-warning btn-xs">Pending</button>
                                        </>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBookings;