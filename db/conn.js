const mongoose=require("mongoose");
mongoose.connect(process.env.DB).then(()=>{
    console.log("Connected to Database");
}).catch((e)=>{
    console.log("Database Connection Failed");
});
