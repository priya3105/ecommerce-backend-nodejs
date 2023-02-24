const Order=require("../models/orderModel");
const Cart=require("../models/cartModel");
const User=require("../models/userModel");
module.exports.getOrder=async(req,res)=>{
    const userId=req.params.id;
    Order.find({userId}).sort().then((orders)=>res.json(orders))
}