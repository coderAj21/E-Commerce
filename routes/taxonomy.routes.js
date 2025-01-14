const express=require("express");
const { taxonomy } = require("../controller/taxonomyController");
const taxonomyRouter=express.Router();


taxonomyRouter.route("").get(taxonomy);



module.exports=taxonomyRouter;