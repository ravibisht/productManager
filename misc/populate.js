
import dotenv from 'dotenv'
dotenv.config()

import connectDB from '../db/connect.js'
import Product from "../models/product.js"
import products from '../misc/product.json'


const start = async (URI) => {
    try {
        await connectDB(URI)
        await Product.deleteMany()
        await Product.create(products)
        console.log('Success Fully Created ')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(-1)
    }

}

console.log(process.env.PORT)
start("mongodb+srv://stark:6i6FbrgsDFAUfcd@cluster0.rujkt.mongodb.net/PRODUCTMANAGER?retryWrites=true&w=majority")

// node --experimental-json-modules populate.js