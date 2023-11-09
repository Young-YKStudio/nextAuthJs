import { useSelector } from "react-redux";
import RdxQtyAddButton from "../../../redux/cart/AddQtyButton";
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/router";

const Sample = () => {

  const router = useRouter()
  const [qty, setQty] = useState(0)
  const { cartItems } = useSelector((state) => state.cart)

  // 1. Order Create
  // 2. redirect Page after creating an order in Mongo
  // 3. Stripe


  const numberChangeHandler = (e) => {
    setQty(e.target.value)
  }

  const clickHandler = (e) => {
    e.preventDefault()
    let currentOrder = {
      item: 'stripeTutorial',
      price: 500,
      qty: Number(qty)
    }

    const requestToAPI = async (data) => {
      const request = await axios.post('/api/order/createOrder', data)

      if(request) {
        router.push(`/sample/payment/${request.data.order._id}`)
        // console.log(request.data)
        // redirect/
        // Loading
        // modal success, failure
      }
    }

    requestToAPI(currentOrder)
  }

  return (
    <div>
      <p className="pt-24">sample page</p>
      <input type='number' onChange={numberChangeHandler} />
      <button onClick={clickHandler}>continue</button>
    </div>
  );
}
export default Sample;