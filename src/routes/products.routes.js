const { Router } = require('express')
const { getAllProducts, createProduct, updateDescriptionProduct } = require('../controllers/products.controller')
const upload = require('../middlewares/upload.middleware')


const router = Router()

router.get('/products', getAllProducts)

router.post('/products', upload.single('productImage'), createProduct)

router.put('/products/:id', updateDescriptionProduct)


module.exports = router
