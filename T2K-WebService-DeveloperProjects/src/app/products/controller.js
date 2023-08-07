const model = require("./model");
const { onResponse } = require("../../utils/index");

module.exports = {
  // API sản phẩm

  productsCT: async (req, res) => {
    await onResponse(req, res, model.productsMD, {});
  },

  productDetailCT: async (req, res) => {
    await onResponse(req, res, model.productDetailMD, {
      data: ({ id } = req.params),
    });
  },

  createProductsCT: async (req, res) => {
    await onResponse(req, res, model.createProductsMD, {
      checkData: ["image", "name", "price", "description"],
      data: ({ image, name, price, sale, description } = req.body),
    });
  },

  createEvaluateCT: async (req, res) => {
    await onResponse(req, res, model.createEvaluateMD, {
      checkData: ["user_id", "product_id", "content"],
      data: ({ user_id, product_id, start_amount, content } = req.body),
      message: "Đã thêm đánh giá",
    });
  },

  // ---------------------------------------------------------------

  // API giỏ hàng
  cartsCT: async (req, res) => {
    await onResponse(req, res, model.cartsMD, {
      data: ({ user_id } = req.query),
    });
  },

  createCartsCT: async (req, res) => {
    await onResponse(req, res, model.createCartsMD, {
      checkData: ["user_id", "product_id", "vip"],
      data: ({ user_id, product_id, vip } = req.body),
      message: "Đã thêm vào giỏ hàng",
    });
  },

  removeCartsCT: async (req, res) => {
    const ids = req.query.ids.split(",").map((id) => parseInt(id));
    await onResponse(req, res, model.removeCartsMD, {
      data: { ids },
      message: "Đã xóa khỏi giỏ hàng",
    });
  },
};
