import dbConnect from "../../../../util/DBConnect";
import Order from '../../../../model/Order'

export default async function viewOrder(req, res) {

  if(req.method !== 'POST') {
    return res.status(303).json({ error: 'reqeust is not POST' })
  }

  const { id } = req.body 

  let connection = await dbConnect()

  if(!connection) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  const foundOrder = await Order.findOne({
    _id: id
  })

  if(foundOrder) {
    console.log(foundOrder)
    return res.status(200).json({
      success: true,
      message: 'yay',
      order: foundOrder
    })
  } else {
    return res.status(400).json({
      success: false,
      message: 'Error at creating order on DB'
    })
  }

  // const {item, price, qty} = req.body

  // let connection = await dbConnect()

  // if(!connection) {
  //   return res.status(400).json({
  //     success: false,
  //     message: 'Error at connecting to DB'
  //   })
  // }

  // const orderCreation = await Order.create({
  //   item: item,
  //   qty: qty,
  //   price: price
  // })

  // if(orderCreation) {
  //   return res.status(200).json({
  //     success: true,
  //     message: 'yay',
  //     order: orderCreation
  //   })
  // } else {
  //   return res.status(400).json({
  //     success: false,
  //     message: 'Error at creating order on DB'
  //   })
  // }

}