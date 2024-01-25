import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'

import { Provider } from 'react-redux';
import authSlice from './redux/authSlice';
import store from './redux/store';

import Navbar from './Component/Navbar'
import { Login, Signup } from './pages'
import Product from './pages/Product';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <App />
      </>
    )
  }, {
    path: '/login',
    element: (
      <>
        <Navbar />
        <Login />
      </>
    )
  }, {
    path: '/signup',
    element: (
      <>
        <Navbar />
        <Signup />
      </>
    )
  }, {
    path: '/product',
    element: (
      <>
        <Navbar />
        <Product />
      </>
    )
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);