import React from "react";
import imagep from '../snkr.jpg';


function ProductCard({ brand, price}) {
    return (
        <div className="product-card">
            <img src={imagep} alt={brand} />
            <h3>{brand}</h3>
            <p>${price}</p>
            <button disabled>View</button>
        </div>
    );
}

export default ProductCard;
