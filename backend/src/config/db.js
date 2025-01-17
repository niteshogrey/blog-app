const mongoose = require('mongoose')
const colors = require("colors")

const connectDb = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Database connected ${mongoose.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`Database Connection failed`.bgRed.white);
    }
}

module.exports = connectDb;