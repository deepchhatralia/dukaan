import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from "react-router-dom"
import { authState, logoutUser } from '../redux/authSlice';
import { DispatchType } from '../redux/store';

const MyNavbar: React.FC = () => {
    const navigate = useNavigate();
    const token = useSelector((state: authState) => state.token)
    const dispatch = useDispatch<DispatchType>()

    const handleLogout = () => {
        if (window.confirm("Logout ??")) {
            if (localStorage.getItem("authModule")) {
                dispatch(logoutUser())
            }
            navigate('/')
        }
    }

    return (
        <div className='container-fluid mb-4' style={{ backgroundColor: "rebeccapurple" }}>
            <nav>
                <div className='row'>
                    <div className='col-md-4'>
                        <ul style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }} className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">
                                    <Link to='/' className='link'>Home</Link>
                                </a>
                            </li>
                            {token ?
                                (<>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            <Link to='/product' className='link'>Products</Link>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            <Link to='' className='link' onClick={handleLogout}>Logout</Link>
                                        </a>
                                    </li>
                                </>)
                                :
                                (<>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            {/* <Navigate to='/login' /> */}
                                            <Link to='/login' className='link'>Login</Link>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            <Link to='/signup' className='link'>Signup</Link>
                                        </a>
                                    </li>
                                </>)
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default MyNavbar;