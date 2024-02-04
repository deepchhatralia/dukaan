import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupThunk } from "../redux/authSlice";
import { DispatchType, rootState } from "../redux/store";
import { clearError } from "../utils/clearError";
import { setCookie } from "../utils/cookie";

const Signup = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [error, setError] = useState("");

    const setErrorWithClear = (msg: string) => {
        setError(msg)
        clearError(setError)
    }

    const navigate = useNavigate()

    const dispatch = useDispatch<DispatchType>();
    const token = useSelector((state: rootState) => state.auth.token)

    useEffect(() => {
        if (token) {
            navigate('/product')
            return
        }
    })

    const clearFields = () => {
        setFname("")
        setLname("")
        setEmail("")
        setPassword("")
        setCpassword("")
    }

    const signup = () => {
        if (!(fname && lname && email && password && cpassword)) {
            setErrorWithClear("Enter all fields")
            return;
        }
        if (fname.length < 3) {
            setErrorWithClear("Minimum 3 characters required for first name")
            return
        }
        if (fname.length > 20) {
            setErrorWithClear("Maximum 20 characters allowed for first name")
            return
        }
        if (lname.length < 3) {
            setErrorWithClear("Minimum 3 characters required for last name")
            return
        }
        if (lname.length > 20) {
            setErrorWithClear("Maximum 20 characters allowed for last name")
            return
        }
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            setErrorWithClear("Invalid email address")
            clearError(setError)
            return;
        }
        if (password.length < 8) {
            setErrorWithClear("Minimum password length must be 8")
            return
        }
        if (password.length > 20) {
            setErrorWithClear("Maximum password length must be 20")
            return
        }
        if (password !== cpassword) {
            setErrorWithClear("Password does not match")
            return;
        }

        setErrorWithClear("")

        // by default set role=0 (merchant)
        dispatch(signupThunk({ fname, lname, email, password, cpassword, role: 0 }))
            .then(val => val.payload)
            .then(val => {
                console.log(val)
                if (val.success) {
                    setCookie('authModule', { user: val.user, token: val.token })
                }
                if (!val.success) {
                    // if error than returns array of msg(each element is an errors)
                    // setErrorWithClear(val.msg[0].msg)
                    setErrorWithClear(val.msg[0].msg)
                    return
                }
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
            })

    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="fname" className="col-sm-2 col-form-label">First Name</label>
                            <div className="col-sm-10">
                                <input value={fname} onChange={e => setFname(e.target.value)} type="text" className="form-control" id="fname" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lname" className="col-sm-2 col-form-label">Last Name</label>
                            <div className="col-sm-10">
                                <input value={lname} onChange={e => setLname(e.target.value)} type="text" className="form-control" id="lname" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="email" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpassword" className="col-sm-4 col-form-label">Confirm password</label>
                            <div className="col-sm-10">
                                <input value={cpassword} onChange={e => setCpassword(e.target.value)} type="password" className="form-control" id="cpassword" />
                            </div>
                        </div>
                        <span style={{ color: "red", fontSize: "13px" }}>{error}</span>
                        <div>
                            <button className='btn btn-primary' onClick={signup}>Signup</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signup