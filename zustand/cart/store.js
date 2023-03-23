import create from 'zustand'

const useStore = create((set) => ({
  // inital states
  cart: [],

  // AddtoCart, localStorage
  addToCart: async (cartItem) => {
    await set((state) => ({...state, cartItem}))
    // set Localstorage
  },
  // RemoveFromCart, localStorage
  removeFromCart : async (cartItem) => {
    let foundItem = cart.find(item => item.id === cartItem.id)
    if(!!foundItem) {
      let newCart = await cart.filter((items) => items.id !== cartItem.id)
      set(state => {newCart})
    }
  }
  // Change isError: Timer
  // Change isSuccess: Timer
  // Change isLoading
  // update Message: Timer
  // setUser
  // clearUser: logout only
}))

export default useStore