import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
}

// CartItem {
//   product: Product;
//   qty: number;
// }

// Procuct {
//   id: string,
//   name: string,
//   price: number,
//   image: string,
// }

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // all actions
    // Cart
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromCart: (state, action) => {
      let foundItem = state.items.find((item) => (item.id === action.payload.id))
      let newCart = [...state.items]
      if (!!foundItem) {
        newCart.splice(foundItem, 1)
      } 
      state.items = newCart
    },
  }
})

export const { addToCart, removeFromCart } = cartSlice.actions

export const selectItems = (state) => state.cartItems.items

export default cartSlice.reducer