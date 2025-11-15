import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/UI/PrimaryButton.jsx";
import "./styles/catalog.css";

const ProductCard = ({ id, brand, price, image, color }) => {
    const navigate = useNavigate();

    return (
        <div className="product-card">
            <img src={image} alt={brand} className="product-image" />

            <h3>{brand}</h3>
            <p>{color}</p>
            <p>${price}</p>

            <PrimaryButton onClick={() => navigate(`/item/${id}`)}>
                View
            </PrimaryButton>
        </div>
    );
};

export default ProductCard;
