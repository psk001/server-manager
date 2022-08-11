const mongoose= require('mongoose')

const connectToDb= async() => {
    mongoose.connect('mongodb://localhost:27017/server-manager',()=>{
        console.log("connected to mongo successfully");
    })
}

module.exports= connectToDb