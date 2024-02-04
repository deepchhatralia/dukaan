import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { rootState } from '../redux/store';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { clearError } from '../utils/clearError';
import axios from 'axios';
import { ForgotPasswordForm, SetNewPasswordForm } from '../components';
import Cookies from 'js-cookie';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const ResetPassword = () => {
    const [searchParam, setSearchParam] = useSearchParams();
    const token = useSelector((state: rootState) => state.auth.token)
    const navigate = useNavigate()

    const [isToken, setIsToken] = useState(false)
    const [error, setError] = useState('')

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")

    const setErrorWithClear = (msg: string) => {
        setError(msg)
        clearError(setError)
    }

    useEffect(() => {
        const urlToken = searchParam.get('token')

        if (token || (token && urlToken)) {
            navigate('/')
            return
        }
        if (urlToken) {
            setIsToken(true)
        }
    }, [])

    const sendResetLink = () => {
        if (!email) {
            setErrorWithClear('Please enter valid email')
            return
        }
        if (!(email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))) {
            setErrorWithClear('Please enter email')
            return
        }
        axios.post(`${BACKEND_URL}/auth/sendResetLink`, { email: email }).then(val => {
            setEmail("")
            if (val.data.success) {
                setErrorWithClear("Reset link sent to your email")
                return
            }
            setErrorWithClear(val.data.msg)
        }).catch(err => console.log(err.message))
    }

    const changePassword = () => {
        if (!(password && cpassword)) {
            setErrorWithClear("All fields are required")
            return
        }
        if (password !== cpassword) {
            setErrorWithClear("Password does not match")
            return
        }
        const token = searchParam.get('token')

        if (token) {
            axios.post(`http://localhost:3001/api/auth/verifyResetToken`, { token, password, cpassword }).then(val => {
                setErrorWithClear(val.data.msg)
                setPassword("")
                setCPassword("")
                // if (val.data.success) {

                // }
            }).catch(err => {
                console.log(err)
            })
        } else {
            setIsToken(true)
        }
    }

    return (
        <>
            {isToken && <SetNewPasswordForm error={error} password={password} setPassword={setPassword} cpassword={cpassword} setCPassword={setCPassword} changePassword={changePassword} />}

            {!isToken && <ForgotPasswordForm email={email} setEmail={setEmail} sendResetLink={sendResetLink} error={error} />}
        </>
    )
}
export default ResetPassword;