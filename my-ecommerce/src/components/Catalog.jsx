import React, { useContext, useState } from "react";
import { ShopContext } from "../components/ShopContext.jsx";
import ProductCard from "./ProductCard.jsx";
import "./styles/catalog.css";
import "./styles/button.css";

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

                <select
                    className="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="">Sort...</option>
                    <option value="priceAsc">Price up</option>
                    <option value="priceDesc">Price down</option>
                    <option value="colorAsc">Color A - Z</option>
                    <option value="colorDesc">Color Z - A</option>
                </select>
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
