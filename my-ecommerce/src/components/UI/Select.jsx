import React from "react";
import "../styles/select.css";

function Select({ value, onChange, options, className = "" }) {
    return (
        <select
            className={`custom-select ${className}`}
            value={value}
            onChange={onChange}
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}

export default Select;
