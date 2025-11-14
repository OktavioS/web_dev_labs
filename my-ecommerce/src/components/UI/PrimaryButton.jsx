import React from "react";
import "../styles/primarybutton.css";

function PrimaryButton({ children, onClick, type = "button" }) {
    return (
        <button className="primary-btn" onClick={onClick} type={type}>
            {children}
        </button>
    );
}

export default PrimaryButton;
