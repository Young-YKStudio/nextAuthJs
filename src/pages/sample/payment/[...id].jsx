import axios from 'axios'
import { useState, useEffect } from 'react'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import CheckoutForm from '../../../components/payment/checkOutForm'

const stripePromise = loadStripe(process.env.APP_STRIPE_PUB_KEY)


// Send payment Intent => Stripe 

const PaymentPortal = (props) => {

  const [ isSectionOpen, setIsSectionOpen ] = useState(false)
  const [ currentOrder, setCurrentOrder ] = useState()
  const [ isPaymentSectionOpen, setIsPaymentSectionOpen ] = useState(false)
  const [ clientSecret, setClientSecret ] = useState()


  const subTotalCalc = (price, qty) => {
    let total = price * qty
    return total
  }
  
  const confirmHandler = async (e) => {
    let currentOrderEntry = {
      orderedItems: [
        {
          item: props.orderInfo.item,
          price: props.orderInfo.price,
          qty: props.orderInfo.qty,
        }
      ],
      subTotal: subTotalCalc(props.orderInfo.price, props.orderInfo.qty),
      orderId: props.orderInfo._id
    }

    await setCurrentOrder(currentOrderEntry)
    setIsSectionOpen(!isSectionOpen)
  }

  const paymentHandler = (e) => {

    const requestToAPI = async () => {
      let sendingData = currentOrder

      let request = await axios.put('/api/stripe/createPaymentIntent', sendingData)

      if(request.data.success) {
        setClientSecret(request.data.clientSecret)
        setIsPaymentSectionOpen(!isPaymentSectionOpen)
      }
    }

    requestToAPI()
  }

  const appearance = {
    theme: 'stripe'
  }

  const options = {
    clientSecret,
    appearance
  }
  
  console.log(props)
  return (
    <div className='flex flex-col gap-12'>
      <div>
        <p className='pt-24 font-bold'>Confirm Order Section</p>
        <div>
          <p>Order Details</p>
          <p>Item Name: {props.orderInfo.item}</p>
          <p>Item Price: {props.orderInfo.price}</p>
          <p>Qty: {props.orderInfo.qty}</p>
          <p>Total: {subTotalCalc(props.orderInfo.price, props.orderInfo.qty)}</p>
        </div>
        <button onClick={confirmHandler}>Confirm Order</button>
      </div>

      {isSectionOpen && <div>
          <h3 className='font-bold'>Payment Section</h3>
          <div>
            {currentOrder &&
              <div>
                {currentOrder.orderedItems.map((item, i) => {
                  return <div key={item +i}>
                    <p>{item.item}</p>
                    <p>{item.price}</p>
                    <p>{item.qty}</p>
                  </div>
                })}
                <p>subTotal: {currentOrder.subTotal}</p>
                <button onClick={paymentHandler}>Continue to Payment</button>
              </div>
            }
          </div>
          {isPaymentSectionOpen &&
            <div>
              <p>Payment Section</p>
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm clientSecret={clientSecret} orderData={currentOrder} />
              </Elements>
            </div>
          }
        </div>
      }
    </div>
  );
}
export default PaymentPortal;

export async function getServerSideProps(context) {
  const id =  context.params.id[0]

  let sendingData = {
    id: id
  }

  let orderData
  
  const request = await axios.post(`${process.env.APP_URL}/api/order/viewOrder`, sendingData)

  if(request) {
    orderData = request.data.order
  }
  
  return { props: {orderId: id, orderInfo: orderData}}

}

// receive order ID
// receive order info from API