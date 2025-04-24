import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage or use an empty array
const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
      // Save updated state to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeOneFromCart: (state, action) => {
      const item = action.payload;
      const index = state.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        if (state[index].quantity > 1) {
          state[index].quantity -= 1;
        } else {
          state.splice(index, 1);
        }
      }
    },
    deleteFromCart(state, action) {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
        // Save updated state to localStorage
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
