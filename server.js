const express = require("express")  ; 
const body_parser = require("body-parser"); //Content Type : Json  
const cors = require("cors")                //interaction between angular and node js 
const morgan =require("morgan")   //Http Logger configuration 
const http=require("http")
const mongoose=require("mongoose")
const path=require('path')
const app = express()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
require('dotenv').config()
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended: true}))
app.use(cors())
app.use(morgan('tiny'))
//Connection Between MongoDb and node js 
uri=process.env.DBURL
mongoose.set('strictQuery',true)
mongoose.connect('mongodb://localhost:27017/Event', { useNewUrlParser: true, useUnifiedTopology: true , autoIndex: true })
mongoose.connection.on('err', () => { console.log('connection failed') });
mongoose.connection.on('ok', () => { console.log('connection done') })
// Mong 
const server=http.createServer(app) // localhost 

const UserRoute= require('./routes/userRoute')
const EventRoute= require('./routes/EventRoute')
const ListRoute= require('./routes/listRoute')
  app.use('/event',EventRoute)
 app.use('/user',UserRoute)
 app.use('/list',ListRoute)

app.listen(3000,()=>{
    console.log("server is running on port ", 3000)
})  //port

 



