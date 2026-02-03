const express=require("express");
const protect=require("../middleware/authMiddleware")
const { createLead } = require("../controller/leadController");
const routes=express.Router();

routes.post("/",protect,createLead);

module.exports=routes;