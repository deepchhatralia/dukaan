import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom"
import { authState, logoutUser } from '../redux/authSlice';
import { DispatchType } from '../redux/store';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const token = useSelector((state: authState) => state.token)
    const dispatch = useDispatch<DispatchType>()

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate('/')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-bright bg-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">
                            <Link to='/'>Home</Link>
                        </a>
                    </li>
                    {token ?
                        (<>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <Link to='/product'>Products</Link>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <Link to='' onClick={handleLogout}>Logout</Link>
                                </a>
                            </li>
                        </>)
                        :
                        (<>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <Link to='/login'>Login</Link>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <Link to='/signup'>Signup</Link>
                                </a>
                            </li>
                        </>)
                    }

                </ul>
            </div>
        </nav>
    )
}
export default Navbar