import Offer from "../models/offerModel.js";


//create offer controller

export const createOfferController = async (req, res) => {
    try {
        const { name, description, discount, photo} = req.body;
        if (!name || !description || !discount || !photo) {
            return res.status(400).json({ message: "Name, description, and discount are required" });
        }

        const existingOffer = await Offer.findOne({ name });
        if (existingOffer) {
            return res.status(400).json({ message: "Offer with this name already exists" });
        }

        const offer = await new Offer({ name, description, discount,photo }).save();
        res.status(201).json({ message: "Offer created successfully", offer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating offer", error });
    }
};


//get offer controller

export const getOffersController = async (req, res) => {
    try {
        const offers = await Offer.find();
        res.status(200).json({ success: true, offers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching offers", error });
    }
};


//delete offer controller

export const deleteOfferController = async (req, res) => {
    try {
        const { id } = req.params;

        const offer = await Offer.findById(id);
        if (!offer) {
            return res.status(404).json({ success: false, message: "Offer not found" });
        }

        await Offer.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Offer deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error deleting offer", error });
    }
};


//update offer controller

export const updateOfferController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, discount,photo } = req.body;

        const existingOffer = await Offer.findById(id);
        if (!existingOffer) {
            return res.status(404).json({ success: false, message: "Offer not found" });
        }

        existingOffer.name = name || existingOffer.name;
        existingOffer.description = description || existingOffer.description;
        existingOffer.discount = discount || existingOffer.discount;
        existingOffer.photo = photo || existingOffer.photo;

        const updatedOffer = await existingOffer.save();
        res.status(200).json({ success: true, message: "Offer updated successfully", updatedOffer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating offer", error });
    }
};
