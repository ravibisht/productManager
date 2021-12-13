import express from 'express'
import 'dotenv/config'

import connectDB from './db/connect.js'
import productRouters from './routes/product.js'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import NotFoundMiddleware from './middleware/NotFoundMiddleware.js'
import expressAsycError from 'express-async-errors'

import HttpException from './exception/HttpException.js'


const app = express()

const port = process.env.PORT || 8080


/* middle-ware */
// json middle ware for post request
app.use(express.json())



/* Routers */

app.get('/', (req, res) => {
    res.send("Hello World")
    throw new HttpException(`Error From ${req.url}`, 503)
    console.log(productRouters)
})

app.use('/api/v1/products', productRouters)



/* Error Handler Middlers */
app.use(errorHandlerMiddleware)
app.use(NotFoundMiddleware)


const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(` ${process.env.MONGO_URI} Server Is Running On Port  ${port} `))
    } catch (error) {
        console.log(error)
    }
}


startServer()