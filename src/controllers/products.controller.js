const { Op } = require('sequelize')
const { Products } = require('../models')


const getAllProducts = async (req, res, next) => {
  try {
    const products = await Products.findAll({
      where: {availableQty:{[Op.gt]: 0}}
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
}

const createProduct = async (req, res, next) => {
  try {
    // {name, price, availableQty, userId, productImage} = req.body
    const { file, body } = req

    const url = process.env.NODE_ENV === 'production' ? `${process.env.URL}/products/${file.filename}` : `${process.env.URL}:${process.env.PORT}/products/${file.filename}`

    const newProduct = await Products.create({...body, productImage: url})

    res.status(201).end();
  } catch (error) {
    next(error)
  }
}

const updateDescriptionProduct = async (req, res, next) => {
  try {
    const { id } = req.params

    const { description } = req.body
    
    await Products.update({ description: description }, {
      where: {id}
    })
    res.status(204).end();
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getAllProducts, 
  createProduct,
  updateDescriptionProduct
}