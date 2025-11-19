import React, { createContext, useState } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    const [shoesData] = useState([
        { id: 1, brand: "Nike Air Zoom", color: "Black", price: 120, image: "/snkr.jpg", description: "Lightweight running shoe with responsive cushioning." },
        { id: 2, brand: "Adidas Ultraboost", color: "White", price: 150, image: "/snkr.jpg", description: "Comfortable performance sneaker with Boost sole." },
        { id: 3, brand: "Puma Rider", color: "Red", price: 100, image: "/snkr.jpg", description: "Retro-style running shoe with modern comfort." },
        { id: 4, brand: "Reebok Classic", color: "Blue", price: 90, image: "/snkr.jpg", description: "Timeless design and durable materials for everyday wear." },
        { id: 5, brand: "New Balance 574", color: "Gray", price: 130, image: "/snkr.jpg", description: "Iconic casual sneaker with premium cushioning." },
        { id: 6, brand: "Asics Gel", color: "Green", price: 110, image: "/snkr.jpg", description: "Performance shoe with superior shock absorption." },
    ]);

    return (
        <ShopContext.Provider value={{ shoesData }}>
            {children}
        </ShopContext.Provider>
    );
};
