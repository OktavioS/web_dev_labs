import React, { useContext, useState } from "react";
import { ShopContext } from "../components/ShopContext.jsx";
import ProductCard from "./ProductCard.jsx";
import "./styles/catalog.css";

function Catalog() {
    const { shoesData } = useContext(ShopContext);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredShoes = shoesData.filter(
        (item) =>
            item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.color.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="catalog-container">
            <input
                type="text"
                placeholder="Search by name or color..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            <div className="cards-grid">
                {filteredShoes.map((p) => (
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
