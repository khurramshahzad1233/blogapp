const express=require("express");
const { getallblogcontroller, searchblogcontroller, getsingleblogcontroller, createblogreviewcontroller, createblogcontroller, deleteblogcontroller, updateblogcontroller } = require("../controllers/blogcontroller");
const {authuser,authrole}=require("../middleware/auth")
const router=express.Router()

router.route("/blogs").get(getallblogcontroller)
router.route("/blog/search").get(searchblogcontroller)
router.route("/blog/:id").get(getsingleblogcontroller);
router.route("/blog/review/new").put(createblogreviewcontroller)
router.route("/blog/create/new").post(authuser,createblogcontroller)
router.route("/blog/delete/:id").delete(authuser,deleteblogcontroller);
router.route("/blog/update/:id").put(authuser,updateblogcontroller);
router.route("/blog/admin/all").get(authuser, authrole("admin"), getallblogcontroller)



module.exports=router;