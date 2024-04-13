let express = require("express");
let { verifyAdminToken, verifyAdminOrUserToken } = require("../controller/userController");
let productRouter = express.Router();
let {
  getProducts,
  saveProduct,
  deleteProduct,
  updateProduct,
  getProductsCount
} = require("../controller/productController");

productRouter.get("/", getProducts);

productRouter.post("/", verifyAdminToken, saveProduct);

productRouter.delete("/:id", verifyAdminToken, deleteProduct);

productRouter.put("/:id", verifyAdminOrUserToken, updateProduct);

productRouter.get("/count", getProductsCount);

module.exports = productRouter;