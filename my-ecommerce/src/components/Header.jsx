import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cartIcon from "../shpcrt.jpg"; // сюди додай картинку кошика у папку assets
import "../App.css";

function Header() {
    const cart = useSelector((state) => state.cart);
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header-left">
                <h1 onClick={() => navigate("/")} className="logo">
                    My Shoe Store
                </h1>
                <p>Your best footwear in one place</p>
            </div>

            <div className="header-right" onClick={() => navigate("/cart")}>
                <img src={cartIcon} alt="Cart" className="cart-img" />
                {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </div>
        </header>
    );
}

export default Header;
