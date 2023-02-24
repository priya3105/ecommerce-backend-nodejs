const {Router}=require("express");
const cartController=require("../controllers/cartController");
const router=Router();
router.get("/cart/:id",cartController.get_cart_items);
router.post("/cart/:id",cartController.add_cart_item);
router.put("/cart/:id",cartController.update_cart_module);
router.delete("/cart/:id",cartController.delete_items);
module.exports=router;