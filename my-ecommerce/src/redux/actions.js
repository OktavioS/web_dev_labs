export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREASE_QTY = "INCREASE_QTY";
export const DECREASE_QTY = "DECREASE_QTY";

export const addToCart = (product) => {
    return {
        type: "ADD_TO_CART",
        payload: product,
    };
};


export const updateQuantity = (id, quantity) => ({
    type: "UPDATE_QUANTITY",
    payload: { id, quantity },
});


export const removeFromCart = (id) => ({
    type: REMOVE_FROM_CART,
    payload: id,
});
