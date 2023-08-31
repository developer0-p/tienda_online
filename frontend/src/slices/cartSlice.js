import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems: []}

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find((x) => x.product === item.product);
            if (existingItem) {
                state.cartItems = state.cartItems.map((x) => x.product === existingItem.product ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            // Calculate items price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))
            // Calculate shipping price
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10 )
            // Calculate tax price
            state.taxPrice = addDecimals((0.21 * state.itemsPrice));
            // Calculate total price
            state.totalPrice = addDecimals(Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice));
            localStorage.setItem('cart', JSON.stringify(state));

        }
    }
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
