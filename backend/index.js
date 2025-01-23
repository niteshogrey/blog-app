const express = require("express");
const cors = require("cors");
const colors = require("colors")
const dotenv = require('dotenv');
const connectDb = require("./src/config/db");
const user = require("./src/routes/userRouter");
const blog = require("./src/routes/blogRouter");
const connectCloudinary = require("./src/config/cloudinary");


//env config
dotenv.config()
connectCloudinary()

//rest object 
const app = express()

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/v1/user', user)
app.use('/api/v1/blog', blog)



const Port = process.env.PORT;

//listen
app.listen(Port, async()=>{
    console.log(`Server is running on http://localhost:${Port}`.bgCyan.white);
    try {
    await connectDb()
    } catch (error) {
        console.log(`Failed to database initialize`.bgRed.white);
    }
})
