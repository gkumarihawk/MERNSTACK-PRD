console.log("Creating API using express server")

const express = require('express') //importing express package and use top level express method
const app = express() //using express function we initialize express application

const cors = require("cors");

const adminApp = express() //created to load the request for admin/backend work
const adminRoutes = require("./Router/admin-route")

const userApp = express() //created to load the request for admin/backend work
const userRoutes = require("./Router/user-route")

const productApp = express() //created to load the request for admin/backend work
const productRoutes = require("./Router/Product-route")

const cartApp = express() //created to load the request for admin/backend work
const cartRoutes = require("./Router/cart-route")

const orderApp = express() //created to load the request for admin/backend work
const orderRoutes = require("./Router/order-Route")

const reviewApp = express() //created to load the request for admin/backend work
const reviewRoutes = require("./Router/review-route")

app.use(cors()) //enabling cross origin resource sharing at root level
//setting up the middleware static to handle all the static files we need to serve to client
// serve static files like images css using static middleware 
app.use('/static', express.static('public')) //localhost:9000/static/alert.js

//json middle-ware for setting request content type to json in body
app.use(express.json({limit:'2mb', extended:false})); 

app.use('/admin', adminApp)
adminApp.use('/',adminRoutes)

app.use('/user', userApp) //http://localhost:9000/user/api/signinup
userApp.use('/',userRoutes)

app.use('/product', productApp)
productApp.use('/',productRoutes)

app.use('/cart', cartApp)
cartApp.use('/',cartRoutes)

app.use('/recentorders', orderApp)
orderApp.use('/',orderRoutes)

app.use('/reviews', reviewApp)
reviewApp.use('/',reviewRoutes)


//default or wild card operator to serve request for any request

app.listen(9000)

console.log("API is ruuning at http://localhost:9000")