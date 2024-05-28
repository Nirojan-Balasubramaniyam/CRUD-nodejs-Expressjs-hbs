const express = require ("express");
const router = express.Router();
const studentController = require("../controllers/studentsControllers");

//view all record
router.get("/",studentController.view);

//Add new record
router.get("/adduser",studentController.adduser);
router.post("/adduser",studentController.save);

//Update user
router.get("/edituser/:id",studentController.edituser);
router.post("/edituser/:id",studentController.edit);

//Delete user
router.get("/deleteuser/:id",studentController.deleteuser);



module.exports=router;
