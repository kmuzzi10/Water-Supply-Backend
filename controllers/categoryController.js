import categoryModel from "../models/categoryModel.js"
import slugify from "slugify";




//create category controller
export const createCategoryController = async (req, res) => {
    try {
        console.log("Inside crateCategoryController");
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "name is required" })
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category already exists"
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: 'new category created',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error in category'
        })
    }
}





//get category controller

export const getCategoryController = async (req, res) => {
    try {
        console.log("Inside getCategoryController");
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: 'all category list',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error in category'
        })
    }
}




//delete category controller
export const deleteCategoryController = async (req, res) => {
    try {
        console.log("Inside deleteSingleController");
        const { id } = req.params
        const category = await categoryModel.findOneAndDelete(id);
        if (category) {
            res.status(200).send({
                success: true,
                message: 'Category deleted successfully',
                category
            })
        } else {
            res.status(404).send({
                success: false,
                message: 'category not found',
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error in category'
        })
    }
}






//update category controller

export const updateCategoryController = async (req, res) => {
    try {
        console.log("Inside updateCategoryController");
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        res.status(200).send({
            success: true,
            message: 'Category Updated Succesfully',
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error in category'
        })
    }
}


