import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authState } from "../redux/authSlice";

const Product = () => {
    const navigate = useNavigate()
    let token = useSelector((state: authState) => state.token);

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }
    })

    return (
        <>
            <div>Product</div>
        </>
    )
}

export default Product