const express=require("express");
const protect=require("../middleware/authMiddleware")
const { createLead, getLead, updateLead, deleteLead } = require("../controller/leadController");
const routes=express.Router();

routes.post("/",protect,createLead);
routes.get("/leads",protect,getLead);
routes.put("/leads/:id",protect,updateLead);
routes.delete("/leads/:id",protect,deleteLead);

module.exports=routes;