require('dotenv').config()

const express=require('express')
const cors=require('cors')
const bodyparser=require('body-parser')
const app=express()
const customerRouter=require('./routes/customerRoute')

app.use(express.json())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(cors())

app.use('/api', customerRouter)

app.use((err, req, res, next)=>{
  err.statusCode=err.statusCode||500;
  err.message=err.message||"Internal Server Error";
  res.status(err.statusCode).json({
    message:err.message,
  })
})

app.listen(3000, ()=>{
  console.log("Server is running on port 3000");
})