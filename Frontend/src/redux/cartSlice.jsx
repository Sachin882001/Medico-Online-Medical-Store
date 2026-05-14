import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];
console.log(initialState);

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            // Check if the item already exists in the cart
            const existingItem = state.find(item => item.productId === action.payload.productId);
            if (existingItem) {
                // Check available quantity before adding
                if (existingItem.quantity + action.payload.quantity <= action.payload.availableQuantity) {
                    existingItem.quantity += action.payload.quantity;
                } else {
                    console.error('Cannot exceed available quantity');
                }
            } else {
                state.push(action.payload);
            }
        },
        deleteFromCart(state, action) {
            return state.filter(item => item.productId !== action.payload.productId);
        },
        incrementQuantity(state, action) {
            const item = state.find(item => item.productId === action.payload);
            if (item && item.quantity < item.availableQuantity) {
                item.quantity++;  // Increment only if it doesn't exceed availableQuantity
            } else {
                console.error('Cannot increment beyond available quantity');
            }
        },
        decrementQuantity(state, action) {
            const item = state.find(item => item.productId === action.payload);
            if (item && item.quantity > 1) {
                item.quantity--;  // Decrement only if quantity is greater than 1
            } else {
                console.error('Cannot decrement below 1');
            }
        },
        resetCart() {
            return [];  // Reset the cart to an empty state
        },
    },
});

// Action creators are generated for each case reducer function
export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
