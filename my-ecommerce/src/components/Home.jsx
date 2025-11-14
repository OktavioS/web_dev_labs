import React, { useContext, useState } from "react";
import ProductCard from "./ProductCard";
import { ShopContext } from "../components/ShopContext.jsx";
import "../App.css";

const Home = () => {
    const [visibleCount, setVisibleCount] = useState(4);

    const { shoesData } = useContext(ShopContext);

    const showMore = () => setVisibleCount((prev) => prev + 4);

    return (
        <div className="home-container">
            <h1 className="home-title">Our Shoes Collection</h1>

            <div className="product-list">
                {shoesData.slice(0, visibleCount).map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        brand={product.brand}
                        price={product.price}
                        color={product.color}
                        image={product.image}
                    />
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
