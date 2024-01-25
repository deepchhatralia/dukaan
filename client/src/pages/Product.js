import axios from "axios"
import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Product = () => {
    const navigate = useNavigate()
    let token = useSelector((state) => state.token);

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