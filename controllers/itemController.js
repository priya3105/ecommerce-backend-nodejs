const Item = require("../models/productModel");
module.exports.get_items = (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
};
module.exports.post_items = (req, res) => {
  const newItem = new Item(req.body);
  newItem.save().then((item) => res.json(item));
};
module.exports.update_item=(req,res)=>{
    Item.findByIdAndUpdate({_id:req.params.id},req.body).then((item)=>res.json(item));
};
module.exports.delete_item=(req,res)=>{
    Item.findByIdAndDelete({_id:req.params.id}).then((item=>res.json({item,success:true,message:"ok"}))
    )};
