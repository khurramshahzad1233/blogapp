const express=require("express");
const { getallusercontroller, registerusercontroller, loginusercontroller, getprofilecontroller, logoutusercontroller, updateusercontroller, updatepasswordcontroller, getallblogofsingleusercontroller, deleteusercontroller } = require("../controllers/usercontroller");
const {authuser, authrole}=require("../middleware/auth")
const router=express.Router();

router.route("/user").get(getallusercontroller)
router.route("/user/register").post(registerusercontroller);
router.route("/user/login").post(loginusercontroller)
router.route('/user/me').get(authuser, getprofilecontroller);
router.route("/user/logout").get(logoutusercontroller);
router.route("/user/update").put(authuser,updateusercontroller);
router.route("/user/password/update").put(authuser,updatepasswordcontroller)
router.route("/user/blog/me").get(authuser,getallblogofsingleusercontroller);
router.route("/user/admin/all").get(authuser,authrole("admin"),getallusercontroller);
router.route("/user/admin/:id").delete(authuser,authrole("admin"),deleteusercontroller);

module.exports=router;