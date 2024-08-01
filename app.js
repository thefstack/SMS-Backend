const express = require("express");

const app = express();
require("dotenv").config();

require("./db/conn");
const cors=require("cors");
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin:'http://localhost:3000',
  credentials:true
}));


const PORT = process.env.PORT || 5000;

const studentRouter = require("./router/studentRoutes");
const teacherRoutes = require("./router/teacherRoutes");
const classRoutes = require("./router/classRoutes");
const subjectRoutes = require("./router/subjectRoutes");
const userRoute=require("./router/userRoutes");
const examRoute=require("./router/examRoutes")

const { authenticateToken } = require("./middleware/authToken");




app.post("/verify-token",authenticateToken,(req,res)=>{
  console.log("verified")
  res.status(200).json({success:true, message:"Token is Valid"})
})


app.use("/user",userRoute);
app.use("/student", studentRouter);
app.use("/teacher", teacherRoutes);
app.use("/class", classRoutes);
app.use("/subject", subjectRoutes);
app.use("/exam",examRoute);



app.get("/", async (req, res) => {
  res.send("hello from the server");
});

app.listen(PORT, () => {
  console.log(`Server Connected to ${PORT}`);
});
