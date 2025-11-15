import React from "react";
import "../styles/primarybutton.css";

function PrimaryButton({ children, onClick, type = "button", className = "" }) {
    return (
        <button
            className={`primary-btn ${className}`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
}

export default PrimaryButton;
