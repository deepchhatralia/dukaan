import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../redux/authSlice';
import { Outlet, useNavigate } from 'react-router-dom'

import { DispatchType } from '../redux/store';
import { authState } from '../redux/authSlice';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { clearError } from '../utils/clearError';

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()

    const dispatch = useDispatch<DispatchType>();
    const token = useSelector((state: authState) => state.token)

    const authUser = () => {
        if (!(email && password)) {
            setError("All fields are required");
            clearError(setError)
            return;
        }
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            setError("Invalid email address");
            clearError(setError)
            return;
        }
        setError("");

        dispatch(loginThunk({ email, password }))
            .then((val) => val.payload)
            .then((val) => {
                if (val.success) {
                    localStorage.setItem("authModule", JSON.stringify({ ...val.data, token: val.token }))
                    navigate('/product')
                    return
                }
                // console.log(val)
                setError(val.msg)
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (token) {
            navigate('/product');
            return;
        }
    });

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <Form.Group>
                            <Form.Label htmlFor="email" className="col-sm-2 col-form-label"> Email </Form.Label>
                            <div className="col-sm-10">
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" id="email" />
                            </div>
                        </Form.Group>
                        <div className="mb-3">
                            <label htmlFor="password" className="col-sm-2 col-form-label" > Password </label>
                            <div className="col-sm-10">
                                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" />
                            </div>
                        </div>
                        < span style={{ color: "red", fontSize: "13px" }}> {error} </span>
                        <div>
                            <Button onClick={authUser}>Login</Button>
                        </div>
                    </div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Login;