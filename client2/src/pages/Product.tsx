import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ProductState, productThunk } from "../redux/productSlice";
import { DispatchType, rootState } from "../redux/store";

const Product = () => {
    const navigate = useNavigate()

    const [product, setProduct] = useState([])
    const token = useSelector((state: rootState) => state.auth.token);
    const dispatch = useDispatch<DispatchType>();

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }
        dispatch(productThunk(token)).then(val => {
            if (val.payload) {
                setProduct(val.payload)
            }
        }).catch(err => console.log(err))
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="d-flex flex-wrap justify-content-around">
                        {product && product.map((ele: { name: string, price: number, company: string, desc: string }, index) => {
                            return (
                                <div key={index} className="card col-md-4">
                                    <img className="card-img-top img-thumbnail" src="/logo192.png" alt="Card image" />
                                    <div className="card-body">
                                        <h5 className="card-title">{ele.name}</h5>
                                        <h6>{ele.price}</h6>
                                        <p className="card-text">{ele.desc}</p>
                                        <a href="#">Link ↗️</a>
                                    </div>
                                </div>
                            )
                        })}

                        {!product.length && <h3>No products found</h3>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product