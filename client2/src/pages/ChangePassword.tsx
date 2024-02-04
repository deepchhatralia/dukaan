import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, rootState } from '../redux/store'
import { changePasswordThunk } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { clearError } from '../utils/clearError'
import { getCookie, setCookie } from '../utils/cookie'

const ChangePassword = () => {
    const token = useSelector((state: rootState) => state.auth.token)
    const dispatch = useDispatch<DispatchType>();
    const navigate = useNavigate()

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newCpassword, setNewCPassword] = useState("")
    const [error, setError] = useState("")

    const setErrorWithClear = (msg: string) => {
        setError(msg)
        clearError(setError)
    }

    const clearFields = () => {
        setOldPassword("")
        setNewPassword("")
        setNewCPassword("")
    }

    const changePassword = () => {
        if (!(oldPassword && newPassword && newCpassword)) {
            setErrorWithClear("All fields are required")
            return
        }
        if (newPassword !== newCpassword) {
            setErrorWithClear("Confirm password does not match with new password")
            return
        }
        if (newPassword.length < 8) {
            setErrorWithClear("Password should be minimum of 8 characters")
            return
        }
        if (oldPassword === newPassword) {
            setErrorWithClear("New password should not be same as old password")
            return
        }
        const temp = getCookie('authModule').user.email

        dispatch(changePasswordThunk({ oldPassword, newPassword, newCpassword, email: temp })).then(val => {
            console.log(val.payload)

            if (val.payload.success) {
                setErrorWithClear(val.payload.msg)
                clearFields()
                // setCookie('authModule', { token: val.payload.token, user: val.payload.user });

                return
            }
            setErrorWithClear(val.payload.msg)

        }).catch((err: any) => {
            console.log(err)
            setErrorWithClear(err.message)
        })
    }

    useEffect(() => {
        if (!token) {
            navigate('/')
            return
        }
    }, [])

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className="mb-3">
                        <label htmlFor="oldPassword" className="col-sm-2 col-form-label" > Old Password </label>
                        <div className="col-sm-10">
                            <input value={oldPassword} onChange={e => setOldPassword(e.target.value)} type="password" className="form-control" id="oldPassword" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="col-sm-2 col-form-label" > New Password </label>
                        <div className="col-sm-10">
                            <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" className="form-control" id="newPassword" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newCpassword" className="col-sm-2 col-form-label" > Confirm Password </label>
                        <div className="col-sm-10">
                            <input value={newCpassword} onChange={e => setNewCPassword(e.target.value)} type="password" className="form-control" id="newCpassword" />
                        </div>
                    </div>
                    < span style={{ color: "red", fontSize: "13px" }}> {error} </span>
                    <div>
                        <Button onClick={changePassword}>Change Password</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChangePassword