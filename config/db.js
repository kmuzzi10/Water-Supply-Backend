import mongoose from "mongoose";

const connectDB = async ()=>{
try{
const connection = await mongoose.connect(process.env.DB_URL);
console.log(`MongoDB connected : ${connection.connection.host}`);
}catch(err){
    console.log("Error connecting to database: ", err);
}
};

export default connectDB