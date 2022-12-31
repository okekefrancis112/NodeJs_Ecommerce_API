const express = require("express");
const router = express.Router();

const {
     createProduct,
     getProduct,
     getAllProducts,
     updateProduct,
     deleteProduct,
     } = require("../controller/productCtrl");


router.post('/', createProduct);
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/', getAllProducts );

module.exports = router;