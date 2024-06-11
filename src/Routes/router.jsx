import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Contact from "../pages/Contact/Contact";
import PrivateRoute from "./PrivateRoute";
import Checkout from "../pages/Checkout/Checkout";
import MyBookings from "../pages/MyBookings/MyBookings";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            { path: '/', element: <Home /> },
            { path: 'contact', element: <Contact /> },
            { path: 'bookings', element: <PrivateRoute><MyBookings/></PrivateRoute> },
            { path: 'login', element: <Login /> },
            { path: 'sign-up', element: <SignUp /> },
            { path: 'checkout/:id', element: <PrivateRoute><Checkout /></PrivateRoute>, loader: ({params}) => fetch(`http://localhost:5000/service/${params.id}`) },
        ]
    }
])

export default router;