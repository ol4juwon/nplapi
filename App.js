const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

//middlewares
app.use(cors())
app.use(express.json())


//routes
const listingsRoutes = require('./Routes/listings')
// const userRoutes = require('./Routes/users')
const authRoute = require('./Routes/auth')
const profileRoute = require('./Routes/profile')
// Routes
app.get('/',(req,res)=>{
    res.send('we are at home')
})
//lisitng route
app.use('/api/listings',listingsRoutes)
//user route
app.use('/api/users',authRoute)
//profile route 
app.use('/api/users/profile',profileRoute)




//connect to db 
mongoose.set('useUnifiedTopology', true )
mongoose.set('useNewUrlParser',true)
mongoose.connect(process.env.DB_CONN)
.then(()=>console.log("db connected"))
.catch(err=> console.log(err))

// listen to the server
app.listen(4000)