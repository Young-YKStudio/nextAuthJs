import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./service/authService";
import { toast } from 'react-toastify'

const initialState = {
  cartItems: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
}

// Thunks
export const register = createAsyncThunk('cart/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {
    const message = (error.response.data.error) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const checkSession = createAsyncThunk('cart/checkSession', async (user, thunkAPI) => {
  try {
    return await authService.checkSession(user)
  } catch (error) {
    const message = (error.response.data.error) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const checkSessionAgain = createAsyncThunk('cart/checkSessionAgain', async (user, thunkAPI) => {
  try {
    return await authService.checkSessionAgain(user)
  } catch (error) {
    const message = (error.response.data.error) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('cart/logout', async () => {
  await authService.logout()
})

export const login = createAsyncThunk('cart/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message = (error.response.data.error) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

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
    },
    extraReducers: (builder) => {
      builder
        .addCase(register.pending, (state) => {
          state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.message = action.payload
        })
        .addCase(register.rejected, (state, action) => {
          state.isLoading = false
          state.error = true
          state.message = action.payload
        })
        .addCase()
    }
  }
})

export const { addToCart, removeFromCart, cartReset, qtyIncrease, qtyDecrease } = cartSlice.actions

export const selectItems = (state) => state.cart.cartItems

export default cartSlice.reducer