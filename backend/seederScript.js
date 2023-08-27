import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    // clear out all the data in the database
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    // insert the users
    const createdUsers = await User.insertMany(users)

    // get the admin user
    const adminUser = createdUsers[0]._id

    // get the sample products and add the admin user to each product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    // insert the sample products
    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

// destroy all the data in the database
const destroyData = async () => {
  try {
    // clear out all the data in the database
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

// run the importData function if the argument is '-d'
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
// Compare this snippet from backend/models/productModel.js:
// import mongoose from 'mongoose'
//
// const reviewSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     rating: { type: Number, required: true },
//     comment: { type: String, required: true },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'User',
//     },
//   },
//   {
//     timestamps: true,
//   }
// )
//
// const productSchema = mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'User',
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     brand: {
//       type: String,
//       required: true,
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     reviews: [reviewSchema],
//     rating: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     numReviews: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     price: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     countInStock: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   }
// )
//
// const Product = mongoose.model('Product', productSchema)
