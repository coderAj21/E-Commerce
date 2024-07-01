const express=require("express");
const app=express();
require("dotenv").config();
const router = require("./routes/routes");
const PORT=process.env.PORT;

// middleware
app.use(express.json());

// router
app.use("/api",router);

app.get("/",(req,res)=>{
    return res.send("Working...")
})
// server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


