const express = require("express");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

const {
     createProduct,
     getProduct,
     getAllProducts,
     updateProduct,
     deleteProduct,
     addToWishlist,
     } = require("../controller/productCtrl");


router.post('/', authMiddleware, isAdmin, createProduct);
router.put('/:id', authMiddleware, addToWishlist);
router.get('/:id', getProduct);
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);
router.get('/', getAllProducts );

module.exports = router;