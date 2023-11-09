import dbConnect from '../../../../util/DBConnect'
import Order from '../../../../model/Order'

const stripe = require('stripe')(process.env.APP_STRIPE_SEC_KEY)

export default async function CreatePaymentIntent(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({error: 'request is not PUT'})
  }

  // stipe connection
  // db update
  const { orderId, subTotal } = req.body

  
  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'error at connecting to DB'
    })
  }
  
  let foundOrder
  
  try {
    foundOrder = await Order.findOne({_id: orderId})
  } catch (error) {
    return res.stats(400).json({
      success: false,
      message: 'error at finding order on DB'
    })
  }

  
  let paymentIntent = await stripe.paymentIntents.create({
    amount: subTotal,
    currency: 'usd'
  })
  
  if(!paymentIntent) {
    return res.status(400).json({
      success: false,
      message: 'No paymentIntent'
    })
  }
  
  console.log(foundOrder, subTotal, paymentIntent)
  return res.status(200).json({
    clientSecret: paymentIntent.client_secret,
    success: true,
  })
}