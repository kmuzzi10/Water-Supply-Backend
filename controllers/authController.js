import userModel from "../models/userModel.js"
import driverModel from "../models/driverModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";



//register route
export const registerController = async (req, res) => {
    try {
        console.log("Received request body:", req.body);
        const { email, password, phone, address } = req.body;
        
        // Validations
        if (!email) {
            return res.status(400).json({ message: "Email is Required" });
        }
        if (!password) {
            return res.status(400).json({ message: "Password is Required" });
        }
        if (!phone) {
            return res.status(400).json({ message: "Phone no is Required" });
        }
        if (!address) {
            return res.status(400).json({ message: "Address is Required" });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ // 409 Conflict might be more appropriate here
                success: false,
                message: "Already registered, please login",
            });
        }

        // Register the user
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            email,
            phone,
            address,
            password: hashedPassword,
        }).save();

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user: {
                userId: user.userId, // Assuming you'd still like to return the userId
                email: user.email,
                phone: user.phone,
                address: user.address
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Registration",
            error,
        });
    }
};




//login route for login

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        //token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                userId: user.userId,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};


//register driver
export const registerDriverController = async (req, res) => {
    try {
        console.log("Received request body:", req.body);
        const { driverId, name, email, password, phone, address } = req.body;
        //validations
        if (!driverId) {
            return res.status(400).json({ message: "ID is Required" });
        }
        if (!name) {
            return res.status(400).json({ message: "Name is Required" });
        }
        if (!email) {
            return res.status(400).json({ message: "Email is Required" });
        }
        if (!password) {
            return res.status(400).json({ message: "Password is Required" });
        }
        if (!phone) {
            return res.status(400).json({ message: "Phone no is Required" });
        }
        if (!address) {
            return res.status(400).json({ message: "Address is Required" });
        }

        // Check if the user already exists
        const driverUser = await driverModel.findOne({ driverId });
        if (driverUser) {
            return res.status(200).json({
                success: false,
                message: "Already registered, please login",
            });
        }

        // Register the user
        const hashedPassword = await hashPassword(password);
        const driver = await new driverModel({
            driverId,
            name,
            email,
            phone,
            address,
            password: hashedPassword,
        }).save();

        res.status(201).json({
            success: true,
            message: "Driver Registered Successfully",
            driver,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Registration",
            error,
        });
    }
}



//login driver

//login route for login

export const loginDriverController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await driverModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        //token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                driverId: user.userId,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};



export const getDriverDriverController = async (req,res)=>{
    try {
        const products = await driverModel.find({})
        res.status(200).send({
            success: true,
            message: "All drivers",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting drivers",
            error: error
        })
    }
}