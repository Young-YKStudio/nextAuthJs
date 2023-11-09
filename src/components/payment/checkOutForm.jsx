import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from 'react'
import axios from 'axios'

const CheckoutForm = ({clientSecret, orderData}) => {
  const stripe = useStripe()
  const elements = useElements()

  const [ paymentRequest, setPaymentRequest ] = useState('')

  console.log(clientSecret, orderData, 'at checkoutForm')

  const paymentElementOption = {
    layout: 'tabs'
  }

  useEffect(() => {
    let isMounted = true

    if(!stripe) {
      return
    }

    if(!clientSecret) {
      return
    }

    let customerEmail = 'abe@abc.com'

    let formattedTotal = orderData.subTotal

    stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
      if(paymentIntent.status === 'succeeded') {
        console.log('success')
      }
      if(paymentIntent.status === 'processing') {
        console.log('processing')
      }
      if(paymentIntent.status === 'requires_payment_method') {
        console.log('Payment method needed')
      }
      if(paymentIntent.status === 'succeeded') {
        console.log('passed thru')
      }
      
    })

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: `OrderID : ${orderData.orderId}`,
        amount: formattedTotal,
      },
      requestPayerName: true,
      requestPayerEmail: true
    })

    pr.canMakePayment().then(result => {
      if(result) {
        setPaymentRequest(pr)
      }
    })

    pr.on('paymentmethod', async (e) => {
      const { clientSecret } = await axios.post('/api/stripe/confirmPaymentIntent')
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret, {
          payment_method: e.paymentMethod.id
        }, { handleActions: false }
      )
      if(error) {
        e.complete('fail')
        return
      }
      e.complete('success')

      if(paymentIntent.status === 'requires_action') {
        stripe.confirmCardPayment(clientSecret)
      }
    })

    return () => {
      isMounted = false
    }

  },[stripe])

  const submitHandler = async (e) => {
    e.preventDefault()

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.APP_URL}/order/success/${orderData.orderId}`// success Page
      }
    })

    if( error.type === 'card_error' || error.type === 'validation_error') {
      console.log(error.message)
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <p>Check Out</p>
      <PaymentElement option={paymentElementOption}/>
      <button disabled={!stripe || !elements} type='submit'>
        Confirm Payment
      </button>
    </form>
  )
}

export default CheckoutForm