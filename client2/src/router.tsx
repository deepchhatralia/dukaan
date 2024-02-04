import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ChangePassword, InviteStaff, Login, PageNotFound, Product, ResetPassword, Signup, Staff } from "./pages";
import Navbar from "./components/Navbar";
import InvitationSignup from "./pages/InvitationSignup";

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <Navbar />
                <App />
            </>
        )
    },
    {
        path: '/login',
        element: (
            <>
                <Navbar />
                <Login />
            </>
        )
    },
    {
        path: '/signup',
        element: (
            <>
                <Navbar />
                <Signup />
            </>
        )
    },
    {
        path: '/product',
        element: (
            <>
                <Navbar />
                <Product />
            </>
        )
    },
    {
        path: '/changePassword',
        element: (
            <>
                <Navbar />
                <ChangePassword />
            </>
        )
    },
    {
        path: '/staff',
        element: (
            <>
                <Navbar />
                <Staff />
            </>
        )
    },
    { path: '/staff/inviteStaff', element: <InviteStaff /> },
    {
        path: 'invitation', element: (
            <>
                {/* <Navbar /> */}
                <InvitationSignup />
            </>
        )
    },
    {
        path: '/resetPassword',
        element: (
            <>
                <Navbar />
                <ResetPassword />
            </>
        )
    },
    {
        path: '*',
        element: (
            <>
                <Navbar />
                <PageNotFound />
            </>
        )
    }
])