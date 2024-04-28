import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"
import fs from "fs"

//create product

export const createProductController = async (req, res) => {
    try {
        console.log("Request Body:", req.fields);
        console.log("Request Files:", req.files);
        const { name, slug, price, category, size, rating } = req.fields;
        const { photo } = req.files
        if (!name || !price || !category || !size || !rating) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (photo && photo.size > 20000000) {
            return res.status(500).send({
                success: false,
                message: 'Photo is required and it should be less than 20000000mb'
            })
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type

        }
        await products.save()
        res.status(201).send({
            success: true,
            mesage: 'Product created successfully',
            products
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Cannot Create Product",
            error: err
        })
    }
}

//get product by category


export const getproductByCategoryController = async (req, res) => {
    try {
        // Assuming categoryId is the ID of the category you want to filter by
        const categoryId = req.params.id; // or however you get the category ID
        console.log(categoryId)
        const products = await productModel.find({ category: categoryId })
            .populate('category')
            .select("-photo")
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            message: "Products filtered by category",
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            error: error
        });
    }

}

//get all product
export const getProductController = async (req, res) => {
    try {
        var categoryName = ""
        if(req.query.slug){
            const category = await categoryModel.find({slug:req.query.slug})
            categoryName = category[0]._id
            const products = await productModel.find({ category: categoryName }).populate('category').select("-photo").sort({ createdAt: -1 });
        
        const finalProducts = [];
        for (const row of products) {
            const imageUrl = `https://home-mineral-water-supply.vercel.app/api/v1/product/get-product-photo/${row._id}`;
            finalProducts.push({ ...row._doc, image_url: imageUrl });
        }
        
        res.status(200).send({
            success: true,
            message: "All products By Category",
            data: finalProducts
        });
        }else if(req.query.slug == ""){

            const products = await productModel.find({}).populate('category').select("-photo").sort({ createdAt: -1 });
            
            const finalProducts = [];
            for (const row of products) {
                const imageUrl = `https://home-mineral-water-supply.vercel.app/api/v1/product/get-product-photo/${row._id}`;
                finalProducts.push({ ...row._doc, image_url: imageUrl });
            }
            
            res.status(200).send({
                success: true,
                message: "All products",
                data: finalProducts
            });
        }else{
            const products = await productModel.find({}).populate('category').select("-photo").sort({ createdAt: -1 });
            
            const finalProducts = [];
            for (const row of products) {
                const imageUrl = `https://home-mineral-water-supply.vercel.app/api/v1/product/get-product-photo/${row._id}`;
                finalProducts.push({ ...row._doc, image_url: imageUrl });
            }
            
            res.status(200).send({
                success: true,
                message: "All products",
                data: finalProducts
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            error: error
        });
    }
}


//get photo controller

export const productPhotoController = async (req, res) => {

    try {
        console.log('Reached product photo controller');
        const product = await productModel.findById(req.params.pid).select("photo");
        if (!product || !product.photo) {
            return res.status(404).send({
                message: "No product photo found"
            });
        }
        res.set("Content-type", product.photo.contentType);
        res.status(200).send(product.photo.data);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting product photo',
            error
        });
    }

}

//get single product

export const getSingleProductController = async (req, res) => {
    try {
        const id = req.params.id
        const products = await productModel.findById(id)
        res.status(200).send({
            success: true,
            message: "product",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            error: error
        })
    }
}





//update

export const getUpdateProductController = async (req, res) => {
    try {
        console.log("Request Body:", req.fields);
        console.log("Request Files:", req.files);
        const { name, slug, price, category, size, rating } = req.fields;
        const { photo } = req.files
        if (!name || !price || !category || !size || !rating) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (photo && photo.size > 20000000) {
            return res.status(500).send({
                success: false,
                message: 'Photo is required and it should be less than 20000000mb'
            })
        }

        const products = await productModel.findByIdAndUpdate(req.params.id,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        )
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type

        }
        await products.save()
        res.status(201).send({
            success: true,
            mesage: 'Product created successfully',
            products
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Cannot Create Product",
            error: err
        })
    }
}




export const deleteProductController = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            message: 'product deleted successfully'
        })
        if (!product) {
            res.status(404).send({
                success: false,
                message: 'product not found'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in deleting product photo',
            error
        })
    }
}