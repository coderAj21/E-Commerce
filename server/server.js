const express=require("express");
const app=express();
const cors=require("cors");
require("dotenv").config();
const router = require("./routes/routes");
const express_fileupload=require("express-fileupload");
const PORT=process.env.PORT;


app.use(cors({
    origin:'*'
}));
// middleware
app.use(express.json());

// file uplodaer middleware
app.use(express_fileupload());

// router
app.use("/api/v1",router);

app.get("/",(req,res)=>{
    return res.send("Working...")
})
// server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


