const userRoutes = require("./user.routes");
const productsRoutes = require('./products.routes')
const cartRoutes = require('./carts.routes')

const apiRoutes = (app) => {
  app.use(userRoutes, productsRoutes, cartRoutes);
};

module.exports = apiRoutes;
