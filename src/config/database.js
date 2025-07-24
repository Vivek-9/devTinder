 const mongoose = require("mongoose");

 const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://vivekvanga:Tuk7iXgmdRnZTlGn@namatenode.0w3ulwd.mongodb.net/devTinder"         
    )
 }

 module.exports = connectDB;

 