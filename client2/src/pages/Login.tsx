import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom'

import { DispatchType } from '../redux/store';
import { authState } from '../redux/authSlice';

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()

    const dispatch = useDispatch<DispatchType>();
    const token = useSelector((state: authState) => state.token)

    const authUser = async () => {
        if (!(email && password)) {
            setError("All fields are required");
            return;
        }
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            setError("Invalid email address");
            return;
        }
        setError("");

        dispatch(loginThunk({ email, password }))
            .then((val) => val.payload)
            .then((val) => {
                if (val.success) {
                    localStorage.setItem("authModule", JSON.stringify({ ...val.user, token: val.token }))
                    navigate('/product')
                    console.log("here")
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
                        <div className="mb-3">
                            <label htmlFor="email" className="col-sm-2 col-form-label"> Email </label>
                            <div className="col-sm-10">
                                <input value={email} onChange={(e) => setEmail(e.target.value)} required={true} type="text" className="form-control" id="email" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="col-sm-2 col-form-label" > Password </label>
                            <div className="col-sm-10">
                                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" required />
                            </div>
                        </div>
                        < span style={{ color: "red", fontSize: "13px" }}> {error} </span>
                        <div>
                            <button className='btn btn-primary' onClick={authUser}> Login </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login