import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    INCREASE_QTY,
    DECREASE_QTY,
} from "./actions";

const initialState = {
    cart: [],
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const itemIndex = state.cart.findIndex(
                (item) => item.id === action.payload.id
            );

            if (itemIndex >= 0) {
                // Товар вже у кошику → збільшуємо quantity
                const updatedCart = [...state.cart];
                updatedCart[itemIndex].quantity += 1;
                return { ...state, cart: updatedCart };
            } else {
                // Новий товар → додаємо з quantity = 1
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload, quantity: 1 }],
                };
            }

        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload),
            };

        case "UPDATE_QUANTITY":
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };

        default:
            return state;
    }
};
