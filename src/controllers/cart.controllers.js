const { Op } = require('sequelize');
const { ProductsCart, Carts, Orders, ProductsOrder } = require('../models')

const addProductToCart = async (req, res, next) => {
  try {
    const cartId = req.params.id
    const { productId, quantity, price } = req.body

    const productInCart = await ProductsCart.findAll({
      where: {
        [Op.and]: [{cartId}, {productId}]
      }
    })
    console.log(productInCart);

    if (productInCart.length < 1) {
      await ProductsCart.create({ cartId, productId, quantity, price })
    }

    if (productInCart.length > 0) {
      await ProductsCart.increment({ quantity }, { where: { cartId } })
    }
    
    await Carts.increment({ total: quantity * price }, { where: { id: cartId } })
    
    res.status(204).end()
  } catch (error) {
    next(error);
  }
};

const buyProductsCart = async (req, res, next) => {
  try {
    const { userId, products } = req.body
    console.log(req.body);
    const total = products.reduce((accumulator, product) => {
      return accumulator + product.price * product.quantity;
    }, 0);

    const order = await Orders.create({ userId, total })
    
    const productsWithOrder = products.map(product => ({ ...product, orderId: order.id }))
    
    await ProductsOrder.bulkCreate(productsWithOrder)

    await Orders.update({completed: true}, {where: {id: order.id}})
      
    res.status(201).json({
      orderId: order.id,
      total: order.total,
      products: productsWithOrder
    })

  } catch (error) {
    next(error)
  }
}


module.exports = {
  addProductToCart,
  buyProductsCart
};
