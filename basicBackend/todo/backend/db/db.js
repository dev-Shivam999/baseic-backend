import mongoose from "mongoose";

export  const  dbConnection = async()=>{

    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`).then(() => console.log("db.connect successfully")).catch(() => console.log("db.connect unsuccessful", process.env.MONGODB_URI))
    
}