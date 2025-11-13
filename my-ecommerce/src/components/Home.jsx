import React, { useState, useContext } from "react";
import ProductCard from "./ProductCard";
import { ShopContext } from "./ShopContext";
import "../App.css";
import snkr from "../snkr.jpg";

const Home = () => {
    const [visibleCount, setVisibleCount] = useState(4);
    const shoesData = [
    { id: 1, brand: "Nike Air Zoom", price: 120, color: "Red", image: snkr },
    { id: 2, brand: "Adidas Ultraboost", price: 150, color: "Black", image: snkr },
    { id: 3, brand: "Puma Rider", price: 100, color: "Blue", image: snkr },
    { id: 4, brand: "Reebok Classic", price: 90, color: "White", image: snkr },
    { id: 5, brand: "New Balance 574", price: 130, color: "Gray", image: snkr },
    { id: 6, brand: "Asics Gel", price: 110, color: "Green", image: snkr },
    { id: 7, brand: "Under Armour HOVR", price: 140, color: "Yellow", image: snkr },
    { id: 8, brand: "Converse All Star", price: 80, color: "Black", image: snkr },
];


    const showMore = () => setVisibleCount((prev) => prev + 4);

    return (
        <div className="home-container">
            <h1 className="home-title">Our Shoes Collection</h1>

            <div className="product-list">
                {shoesData.slice(0, visibleCount).map((product) => (
                    <ProductCard key={product.id} brand={product.brand} price={product.price} image={product.image} />
                ))}
            </div>

            {visibleCount < shoesData.length && (
                <button onClick={showMore} className="view-more-btn">
                    View more
                </button>
            )}
        </div>
    );
};

export default Home;
