import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/UI/PrimaryButton.jsx";
import "./styles/catalog.css";
import "./styles/button.css";

// REDUX
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";

const ProductCard = ({ id, brand, price, image, color }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const safeImage = image || "/placeholder.png";
    const safeBrand = brand || "Unknown";
    const safePrice = price ?? "—";
    const safeColor = color || "N/A";

    return (
        <div className="product-card">
            <img src={safeImage} alt={safeBrand} className="product-image" />

            <h3>{safeBrand}</h3>
            <p>{safeColor}</p>
            <p>${safePrice}</p>

            <PrimaryButton onClick={() => navigate(`/item/${id}`)}>
                View
            </PrimaryButton>

            <button
                className="add-btn-small"
                onClick={() =>
                    dispatch(
                        addToCart({
                            id,
                            brand: safeBrand,
                            price: safePrice,
                            image: safeImage,
                            color: safeColor,
                        })
                    )
                }
            >
                +
            </button>
        </div>
    );
};

export default ProductCard;
