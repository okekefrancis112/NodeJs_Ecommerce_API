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
     rating,
     uploadImages,
     } = require("../controller/productCtrl");
const { uploadPhoto, productImgSize, productImgResize } = require("../middlewares/uploadImages");


router.post('/', authMiddleware, isAdmin, createProduct);
router.put(
     '/upload/:id',
     authMiddleware,
     isAdmin,
     uploadPhoto.array("images", 10),
     productImgResize,
     uploadImages
     );
router.put('/wishlist', authMiddleware, addToWishlist);
router.put('/rating', authMiddleware, rating);
router.get('/:id', getProduct);
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);
router.get('/', getAllProducts );

module.exports = router;