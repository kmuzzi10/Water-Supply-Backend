import express from "express"
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js"
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoute.js"
import offerRoutes from "./routes/offerRoutes.js"
import productRoutes from "./routes/productRoute.js"
import orderRoutes from "./routes/orderRoute.js"

dotenv.config();

//database config
connectDB();

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

app.use(cors({
    origin: 'http://localhost:3000',  // replace with frontend origin
    credentials: true,  // allow credentials (cookies, authorization headers )
}));
app.use(express.json());
app.use(morgan('dev'));


// Routes
app.get('/',(req,res)=>{
    try {
        res.status(200).send({
            success:true,
            message:"Hello this is Water Supply Backend"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"internal server error",
            error
        })
    }
})
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/offer", offerRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/orders", orderRoutes);


// Server Start
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});