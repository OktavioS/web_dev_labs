import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard.jsx";
import Loader from "./Loader.jsx";
import Select from "../components/UI/Select.jsx";
import axios from "axios";

import "./styles/catalog.css";
import "./styles/button.css";

function Catalog() {
    const [shoes, setShoes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");

    const sortOptions = [
        { value: "", label: "Sort..." },
        { value: "priceAsc", label: "Price up" },
        { value: "priceDesc", label: "Price down" },
        { value: "brandAsc", label: "Brand A–Z" },
        { value: "brandDesc", label: "Brand Z–A" },
    ];

    const fetchShoes = async () => {
        setLoading(true);
        setFadeIn(false);
        try {
            const params = {};
            if (searchTerm) params.search = searchTerm;
            if (sortBy) params.sort = sortBy;

            const res = await axios.get("http://localhost:3000/api/shoes", { params });

            setTimeout(() => {
                setShoes(res.data);
                setLoading(false);

                setTimeout(() => setFadeIn(true), 50);
            }, 300);
        } catch (err) {
            console.error("Error fetching shoes:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShoes();
    }, []);

    useEffect(() => {
        fetchShoes();
    }, [searchTerm, sortBy]);

    return (
        <div className="catalog-container">
            <div className="top-controls">
                <input
                    type="text"
                    placeholder="Search by brand or color..."
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

            {loading ? (
                <Loader />
            ) : (
                <div className={`cards-grid ${fadeIn ? "fade-in" : ""}`}>
                    {shoes.length > 0 ? (
                        shoes.map((p) => (
                            <ProductCard
                                key={p.id}
                                id={p.id}
                                brand={p.brand}
                                price={p.price}
                                color={p.color}
                                image={p.image}
                                description={p.description}
                            />
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Catalog;
