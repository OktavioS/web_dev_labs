import React from "react";

function ProductCard({ brand, price, image }) {
    return (
        <div className="product-card">
            <img src={image} alt={brand} />
            <h3>{brand}</h3>
            <p>${price}</p>
            <button disabled>View</button>
        </div>
    );
}

export default ProductCard;
