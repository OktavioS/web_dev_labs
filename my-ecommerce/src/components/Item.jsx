import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../components/ShopContext.jsx";
import "./styles/itempage.css";

const Item = () => {
    const { id } = useParams();
    const { shoesData } = useContext(ShopContext);
    const product = shoesData.find((item) => item.id === parseInt(id));

    if (!product) return <h2>Item not found</h2>;

    return (
        <div className="item-page">
            <img src={product.image} alt={product.brand} className="item-image" />

            <div className="item-header">
                <h2>{product.brand}</h2>
                <span className="item-price">${product.price}</span>
            </div>

            <button className="buy-btn">Купити</button>

            <p className="item-description">{product.description}</p>
        </div>
    );
};

export default Item;
