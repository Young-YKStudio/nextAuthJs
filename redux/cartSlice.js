import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // all actions
    // Cart
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload]
    },
    removeFromCart: (state, action) => {
      let foundItem = state.cartItems.find((item) => (item.product.id === action.payload.product.id))
      let filteredCart = state.cartItems.filter((item) => item !== foundItem)
      if (!!foundItem) {
        state.cartItems = filteredCart
      } 
    },
    // increase qty
    qtyIncrease: (state, action) => {
      state.cartItems.forEach((item) => {
        if (item.product.id === action.payload.product.id) {
          item.qty += 1
        }
      })
    },
    // decrease qty
    qtyDecrease: (state, action) => {
      console.log(action, 'decrease')
      state.cartItems.forEach((item) => {
        if(item.product.id === action.payload.product.id) {
          if(item.qty > 1) {
            item.qty -= 1
          } else {
            item.qty = 1
          }
        }
      })
    },
    cartReset: (state, action) => {
      if(!!action) {
        state.cartItems = []
      }
    }
  }
})

export const { addToCart, removeFromCart, cartReset, qtyIncrease, qtyDecrease } = cartSlice.actions

export const selectItems = (state) => state.cart.cartItems

export default cartSlice.reducer