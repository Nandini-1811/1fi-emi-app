const express = require('express')
const router = express.Router()
const {getAllProducts , getProductBySlug} = require('../controllers/productController')

router.get('/',getAllProducts);
router.get('/:slug' , getProductBySlug);


module.exports = router;
