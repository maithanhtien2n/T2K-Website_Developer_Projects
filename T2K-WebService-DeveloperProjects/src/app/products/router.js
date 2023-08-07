module.exports = (router) => {
  const commonRoute = "/api/v1";
  const controller = require("./controller");
  const { authenticateToken } = require("../middlewares/index");

  // API SẢN PHẨM ---------------------------------------------------

  // API lấy danh sách sản phẩm
  router.get(`${commonRoute}/products`, controller.productsCT);

  // API lấy chi tiết sản phẩm
  router.get(`${commonRoute}/product/:id`, controller.productDetailCT);

  // API thêm vào danh sách sản phẩm
  router.post(`${commonRoute}/product`, controller.createProductsCT);

  // API thêm đánh giá sản phẩm
  router.post(`${commonRoute}/product/evaluate`, controller.createEvaluateCT);

  // -----------------------------------------------------------------

  // API GIỎ HÀNG ----------------------------------------------------

  // API Lấy danh sách giỏ hàng
  router.get(`${commonRoute}/products/carts`, controller.cartsCT);

  // API thêm sản phẩm vào giỏ hàng
  router.post(`${commonRoute}/products/cart`, controller.createCartsCT);

  // API xóa sản phẩm trong giỏ hàng
  router.delete(`${commonRoute}/products/cart?:ids`, controller.removeCartsCT);
};
