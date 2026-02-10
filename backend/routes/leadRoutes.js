const express=require("express");
const protect=require("../middleware/authMiddleware")
const { createLead, getLead, updateLead, deleteLead,updateLeadStatus,getLeadStat} = require("../controller/leadController");
const routes=express.Router();

routes.post("/",protect,createLead);
routes.get("/leads",protect,getLead);
routes.put("/leads/:id",protect,updateLead);
routes.delete("/leads/:id",protect,deleteLead);
routes.patch("/leads/:id/status",protect,updateLeadStatus);
routes.get("/leads/stats",protect,getLeadStat)

module.exports=routes;