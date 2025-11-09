import React from "react";
import ProductCard from "./ProductCard.jsx";

function Catalog() {
    // Дані про товари
    const shoesData = [
        { id: 1, brand: "Nike Air Zoom", price: 120 },
        { id: 2, brand: "Adidas Ultraboost", price: 150 },
        { id: 3, brand: "Puma Rider", price: 100 },
        { id: 4, brand: "Reebok Classic", price: 90 },
        { id: 5, brand: "New Balance 574", price: 130 },
        { id: 6, brand: "Asics Gel", price: 110 },
    ];

    return (
        <div className="catalog-container">
            <h1>Catalog</h1>
            <div className="product-list">
                {shoesData.map((product) => (
                    <ProductCard
                        key={product.id}
                        brand={product.brand}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    );
}

export default Catalog;
