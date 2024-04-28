import express from "express";
import { getDriverDriverController, loginController, loginDriverController, registerController, registerDriverController } from "../controllers/authController.js";

//router object

const router = express.Router();

//routing

//register user
router.post("/register", registerController);

//login user

router.post("/login", loginController);

//register driver

router.post('/register-driver', registerDriverController)

//login driver
router.post('/login-driver', loginDriverController)


//get
router.get('/get-driver', getDriverDriverController)









export default router;