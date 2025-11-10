import React, { useState } from "react";
import ProductCard from "./ProductCard.jsx";
import './styles/catalog.css';

function Catalog() {
    const [selectedId, setSelectedId] = useState(null);
    // Дані про товари
    const shoesData = [
        { id: 1, brand: "Nike Air Zoom", price: 120 },
        { id: 2, brand: "Adidas Ultraboost", price: 150 },
        { id: 3, brand: "Puma Rider", price: 100 },
        { id: 4, brand: "Reebok Classic", price: 90 },
        { id: 5, brand: "New Balance 574", price: 130 },
        { id: 6, brand: "Asics Gel", price: 110 },
    ];


    const handleSelect = (id) => {
        setSelectedId((prev) => (prev === id ? null : id)); // знімає виділення, якщо клік вдруге
    };

    return (
        <div className="catalog-container">
            <div className="button-row">
                <button className="primaryButton">Купити</button>
                <button className="secondaryButton">Детальніше</button>
                <button className="dangerButton">Видалити</button>
            </div>

            <div className="cards-grid">
                {shoesData.map((p) => (
                    <div
                        key={p.id}
                        onClick={() => handleSelect(p.id)}
                        className={`card-wrapper ${selectedId === p.id ? "selected" : ""}`}
                    >
                        <ProductCard brand={p.brand} price={p.price} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Catalog;
