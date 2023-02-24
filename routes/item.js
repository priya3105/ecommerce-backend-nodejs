const {Router}=require("express");
const itemController=require("../controllers/itemController");
const router=Router();
router.get("./items",itemController.get_items);
router.post("./post_product",itemController.post_items);
router.put("./update_product",itemController.update_item);
router.delete("./delete_product",itemController.delete_item);
module.exports=router;
