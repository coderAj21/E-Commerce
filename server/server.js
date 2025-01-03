const express=require("express");
const app=express();
const cors=require("cors");
const path = require("path");
require("dotenv").config();
const router = require("./routes/routes");
const express_fileupload=require("express-fileupload");
const cookieParser=require("cookie-parser");
const PORT=process.env.PORT;


app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true,
}));
// middleware
app.use(express.json());

app.use(cookieParser());
// file uplodaer middleware
app.use(express_fileupload());

// static path for images
app.use(express.static(path.join(__dirname,'./assets/product')));

// router
app.use("/api/v1",router);

app.get("/",(req,res)=>{
    return res.send("Working...")
})
// server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});