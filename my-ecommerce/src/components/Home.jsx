import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import '../App.css';


const Home = () => {
    const [visibleCount, setVisibleCount] = useState(4);

    const shoesData = [
        { id: 1, brand: "Nike Air Zoom", price: 120 },
        { id: 2, brand: "Adidas Ultraboost", price: 150 },
        { id: 3, brand: "Puma Rider", price: 100 },
        { id: 4, brand: "Reebok Classic", price: 90 },
        { id: 5, brand: "New Balance 574", price: 130 },
        { id: 6, brand: "Asics Gel", price: 110 },
        { id: 7, brand: "Under Armour HOVR", price: 140 },
        { id: 8, brand: "Converse All Star", price: 80 },
    ];

    const showMore = () => setVisibleCount((prev) => prev + 4);

    return (
        <div className="home-container">
            <h1 className="home-title">Our Shoes Collection</h1>

            <div className="product-list">
                {shoesData.slice(0, visibleCount).map((product) => (
                    <ProductCard
                        key={product.id}
                        brand={product.brand}
                        price={product.price}
                    />
                ))}
            </div>

            {/* Кнопка View More */}
            {visibleCount < shoesData.length && (
                <button onClick={showMore} className="view-more-btn">
                    View more
                </button>
            )}
        </div>
    );
};

export default Home;
