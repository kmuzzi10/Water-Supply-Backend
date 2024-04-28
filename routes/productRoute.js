import express from "express"
import ExpressFormidable from "express-formidable"
import { createProductController, deleteProductController, getProductController, getSingleProductController, getUpdateProductController, getproductByCategoryController, productPhotoController } from "../controllers/productController.js"
import { isAdmin, requireSignin } from "../Middleware/authMiddleware.js"

const router = express.Router()


//create product
router.post('/create-product', ExpressFormidable(), requireSignin, isAdmin, createProductController)

//get product
router.get('/get-product', requireSignin, getProductController)


//get product by category
router.get('/get-productByCategory/:id', requireSignin, getproductByCategoryController)


//get photo

router.get('/get-product-photo/:pid', productPhotoController)


//get single product
router.get('/get-singleproduct/:id', requireSignin, getSingleProductController)

//update product
router.put('/update-product/:id', ExpressFormidable(), requireSignin, isAdmin, getUpdateProductController)

//delete product
router.delete('/delete-product/:id', requireSignin, isAdmin, deleteProductController,)




export default router