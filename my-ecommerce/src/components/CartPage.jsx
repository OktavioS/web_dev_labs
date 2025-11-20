import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/actions";
import "./styles/cart.css";

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    const handleRemove = (id) => dispatch(removeFromCart(id));
    const handleQuantityChange = (id, amount) => dispatch(updateQuantity(id, amount));

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-list">
                        {cart.map(item => (
                            <div className="cart-item" key={item.id}>
                                <div className="left-info">
                                    <img src={item.image} alt={item.brand} className="cart-img" />
                                    <div className="item-text">
                                        <h3>{item.brand}</h3>
                                        <p>{item.color}</p>
                                    </div>
                                </div>

                                <p className="price">${item.price}</p>

                                <div className="quantity-box">
                                    <button onClick={() => dispatch(updateQuantity(item.id, item.quantity - 1))}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => dispatch(updateQuantity(item.id, item.quantity + 1))}>+</button>
                                </div>


                                <button className="dangerButton" onClick={() => handleRemove(item.id)}>X</button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <p className="total-text">Total: ${totalPrice.toFixed(2)}</p>
                        <button className="checkout-btn">Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
