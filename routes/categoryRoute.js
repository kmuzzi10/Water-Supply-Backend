import express from "express"
import { createCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from "../controllers/categoryController.js"
import { isAdmin, requireSignin } from "../Middleware/authMiddleware.js"

const router = express.Router()

//create category
router.post('/create-category',createCategoryController,requireSignin,isAdmin)

//get category

router.get('/get-category',requireSignin,getCategoryController)

//update category
router.put('/update-category/:id',requireSignin,isAdmin,updateCategoryController)


//delete category

router.delete('/delete-category/:id',requireSignin,isAdmin,deleteCategoryController)








export default router