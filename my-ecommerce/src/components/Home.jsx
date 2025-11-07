import React from "react";
import ProductCard from "./ProductCard";

function Home() {
    const products = [
        { id: 1, brand: "Nike Air Zoom", price: 120, image: "https://via.placeholder.com/180" },
        { id: 2, brand: "Adidas Boost", price: 140, image: "https://via.placeholder.com/180" },
        { id: 3, brand: "Puma Trailfox", price: 100, image: "https://via.placeholder.com/180" },
        { id: 4, brand: "Reebok Classic", price: 90, image: "https://via.placeholder.com/180" },
    ];

    return (
        <main className="home">
            <h2>Welcome to our online shoe store!</h2>
            <p>Choose your favorite pair and explore our catalog.</p>

            <div className="product-list">
                {products.map((item) => (
                    <ProductCard key={item.id} {...item} />
                ))}
            </div>
        </main>
    );
}

export default Home;
