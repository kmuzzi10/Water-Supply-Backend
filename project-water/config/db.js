import mongoose from "mongoose";

const connectDB = async ()=>{
try{
const connection = await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.vy8kmeo.mongodb.net/`);
console.log(`MongoDB connected : ${connection.connection.host}`);
}catch(err){
    console.log("Error connecting to database: ", err);
}
};

export default connectDB