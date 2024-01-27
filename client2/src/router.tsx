import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Login, PageNotFound, Product, Signup } from "./pages";
import Navbar from "./components/Navbar";

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
        path: '*',
        element: <PageNotFound />
    }
])