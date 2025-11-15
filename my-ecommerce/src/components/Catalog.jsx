import React, { useContext, useState } from "react";
import { ShopContext } from "../components/ShopContext.jsx";
import ProductCard from "./ProductCard.jsx";
import "./styles/catalog.css";
import "./styles/button.css";

import Select from "../components/UI/Select.jsx";   // ← ДОДАНО

function Catalog() {
    const { shoesData } = useContext(ShopContext);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");

    const filtered = shoesData.filter(
        (item) =>
            item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.color.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
        switch (sortBy) {
            case "priceAsc":
                return a.price - b.price;
            case "priceDesc":
                return b.price - a.price;
            case "colorAsc":
                return a.color.localeCompare(b.color);
            case "colorDesc":
                return b.color.localeCompare(a.color);
            default:
                return 0;
        }
    });

    const sortOptions = [
        { value: "", label: "Sort..." },
        { value: "priceAsc", label: "Price up" },
        { value: "priceDesc", label: "Price down" },
        { value: "colorAsc", label: "Color A - Z" },
        { value: "colorDesc", label: "Color Z - A" }
    ];

    return (
        <div className="catalog-container">

            <div className="top-controls">
                <input
                    type="text"
                    placeholder="Search by name or color..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />

                <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    options={sortOptions}
                />
            </div>

            <div className="cards-grid">
                {sorted.map((p) => (
                    <ProductCard
                        key={p.id}
                        id={p.id}
                        brand={p.brand}
                        price={p.price}
                        color={p.color}
                        image={p.image}
                    />
                ))}
            </div>
        </div>
    );
}

export default Catalog;
