const express=require('express')
const router=express.Router()
const { signup, login, getAllProducts, addtoCart, removeFromCart, getCart }=require('../customerController/customer')
const { verifyToken }=require('../config/tokenverification')

router.post('/signup', signup)
router.post('/login', login) 
router.get("/getAllProducts", verifyToken, getAllProducts)
router.post("/:id/addtocart",verifyToken, addtoCart)
router.post("/:id/removefromcart",verifyToken, removeFromCart)
router.get("/:cartID/getcart",verifyToken, getCart)

module.exports=router       