const stripe = require('stripe')(process.env.APP_STRIPE_SEC_KEY)

export default async function ConfirmPaymentIntent(req, res) {
  if(req.method !== 'POST') {
    return res.status(303).json({
      error: 'request is not POST'
    })
  }

  let paymentIntent

  try {
    paymentIntent = await stripe.paymentIntent.create({
      paymentMethodType: 'card',
      currency: 'usd'
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at creating paymentIntent from stripe'
    })
  }

  return res.status(200).json({
    success: true,
    clientSecret: paymentIntent
  })
}