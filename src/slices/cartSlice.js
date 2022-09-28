import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
  isOpen: false,
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    toggleCartOpen(state) {
      state.isOpen = !state.isOpen;
    },
    increment(state, action) {
      const { id, price, image, title } = action.payload;
      const product = state.cart.find((item) => item.id === id);
      //   console.log(product, action.payload);
      if (product) {
        const newCart = state.cart.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        state.cart = newCart;
      } else {
        state.cart.push({ id, price, image, title, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalPrice += price;
    },
    decrement(state, action) {
      const { id, price } = action.payload;
      const product = state.cart.find((item) => item.id === id);
      if (product) {
        console.log(product.quantity, action.payload);
        if (product.quantity === 1) {
          const newCart = state.cart.filter((item) => item.id !== id);
          state.cart = newCart;
        } else {
          const newCart = state.cart.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });
          state.cart = newCart;
        }
        state.totalQuantity -= 1;
        state.totalPrice -= price;
      }
    },
  },
});

export const { toggleCartOpen, increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;
