import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard.jsx";
import Loader from "./Loader.jsx";
import axios from "axios";
import "../App.css";

const Home = () => {
    const [shoesData, setShoesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [visibleCount, setVisibleCount] = useState(4);

    const showMore = () => setVisibleCount((prev) => prev + 4);

    const fetchShoes = async () => {
        setLoading(true);
        setFadeIn(false);
        try {
            const res = await axios.get("http://localhost:3000/api/shoes");

            setTimeout(() => {
                setShoesData(res.data);
                setLoading(false);

                setTimeout(() => setFadeIn(true), 50);
            }, 900);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShoes();
    }, []);

    return (
        <div className="home-container">
            <h1 className="home-title">Our Shoes Collection</h1>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className={`product-list ${fadeIn ? "fade-in" : ""}`}>
                        {shoesData.slice(0, visibleCount).map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                brand={product.brand}
                                price={product.price}
                                color={product.color}
                                image={product.image}
                                description={product.description}
                            />
                        ))}
                    </div>

                    {visibleCount < shoesData.length && (
                        <div style={{ textAlign: "center", marginTop: "20px" }}>
                            <button onClick={showMore} className="view-more-btn">
                                View more
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
