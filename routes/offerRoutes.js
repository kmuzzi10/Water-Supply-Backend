import express from "express";
import { createOfferController, deleteOfferController, getOffersController, updateOfferController } from "../controllers/offerController.js";


const router = express.Router();

//cerate offer controller
router.post("/create-offers", createOfferController);

//get offer controller
router.get('/get-offers', getOffersController)

//delete offer 

router.delete('/delete-offers/:id', deleteOfferController)

//update offer 

router.put('/update-offers/:id', updateOfferController)

export default router;