const {Router}=require("express");
const authController=require("../controllers/Auth");
const authMiddleware=require("../middleware/auth");
const router=Router();
router.post("/register",authController.signup);

router.get("/user",authController.get_user)



module.exports=router;

