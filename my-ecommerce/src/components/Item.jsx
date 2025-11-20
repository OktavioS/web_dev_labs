import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader.jsx";
import axios from "axios";
import "./styles/itempage.css";

// REDUX
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";

function Item() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fadeIn, setFadeIn] = useState(false);

    const dispatch = useDispatch(); // <-- ADD

    useEffect(() => {
        setLoading(true);
        setFadeIn(false);

        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/shoes/${id}`);

                setTimeout(() => {
                    setProduct(res.data);
                    setLoading(false);

                    setTimeout(() => setFadeIn(true), 50);
                }, 1000);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <Loader />;
    if (!product) return <div>Product not found</div>;

    return (
        <div className={`item-page ${fadeIn ? "fade-in" : ""}`}>
            <img className="item-image" src={product.image} alt={product.brand} />

            <div className="item-header">
                <h1 className="item-title">{product.brand}</h1>
                <p className="item-price">${product.price}</p>
            </div>

            {/* BUTTON UPDATED: dispatch to Redux */}
            <button
                className="buy-btn"
                onClick={() => dispatch(addToCart(product))}
            >
                Add to cart
            </button>

            <p className="item-description">{product.description}</p>
        </div>
    );
}

export default Item;
