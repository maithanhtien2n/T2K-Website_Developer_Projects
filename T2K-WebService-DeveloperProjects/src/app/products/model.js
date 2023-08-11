const {
  Products,
  Ratings,
  Carts,
  UsersInfo,
  CustomerOrders,
} = require("./config");
const { throwError, generateRandomCode } = require("../../utils/index");
const { Op } = require("sequelize");
require("dotenv").config();

module.exports = {
  productsMD: async ({ key_search }) => {
    try {
      const key = key_search ? key_search : "";
      return [
        ...(await Products.findAll({
          where: {
            [Op.or]: [
              {
                name: {
                  [Op.like]: `%${key}%`, // Sử dụng Op.like để thực hiện tìm kiếm gần đúng
                },
              },
              {
                description: {
                  [Op.like]: `%${key}%`, // Sử dụng Op.like để thực hiện tìm kiếm gần đúng
                },
              },
            ],
          },
        })),
      ].map((item) => {
        return {
          product_id: item?.product_id,
          image: item?.image,
          name: item?.name,
          price: item?.price,
          sale: item?.sale ? `${item?.sale}%` : undefined,
          price_sale: item?.sale
            ? item?.price - (item?.price * item?.sale) / 100
            : undefined,
          description: item?.description,
          sold: item?.sold,
          created_at: item?.created_at,
          updated_at: item?.updated_at,
        };
      });
    } catch (error) {
      throw error;
    }
  },

  productDetailMD: async ({ id }) => {
    try {
      const item = await Products.findOne({
        where: { product_id: id },
        include: [
          {
            model: Ratings,
            as: "evaluate",
            attributes: [
              "rating_id",
              "start_amount",
              "content",
              "created_at",
              "updated_at",
            ],
            include: [
              {
                model: UsersInfo,
                as: "user",
                attributes: ["image", "full_name"],
              },
            ],
          },
        ],
      });
      return {
        product_id: item?.product_id,
        image: item?.image,
        name: item?.name,
        price: item?.price,
        sale: item?.sale ? `Giảm ${item?.sale}%` : undefined,
        price_sale: item?.sale
          ? item?.price - (item?.price * item?.sale) / 100
          : undefined,
        description: item?.description,
        sold: item?.sold,
        amount_evaluate: item?.evaluate.length,
        total_evaluate:
          item?.evaluate
            .filter(({ start_amount }) => start_amount !== 0)
            .reduce((start, { start_amount }) => start + start_amount, 0) /
          item?.evaluate.filter(({ start_amount }) => start_amount !== 0)
            .length,
        evaluate: item?.evaluate
          .map((item) => {
            return {
              rating_id: item?.rating_id,
              image: item?.user?.image,
              full_name: item?.user?.full_name,
              start_amount: item?.start_amount
                ? item?.start_amount
                : "Chưa trải nghiệm sản phẩm",
              content: item?.content,
              created_at: item?.created_at,
              updated_at: item?.updated_at,
            };
          })
          .reverse(),
        created_at: item?.created_at,
        updated_at: item?.updated_at,
      };
    } catch (error) {
      throw error;
    }
  },

  createProductsMD: async ({ image, name, price, sale, description }) => {
    try {
      await Products.create({
        image,
        name,
        price,
        sale: sale ? sale : 0,
        description,
        sold: 0,
      });
      return "Thêm sản phẩm vào danh sách thành công!";
    } catch (error) {
      throw error;
    }
  },

  createEvaluateMD: async ({ user_id, product_id, start_amount, content }) => {
    try {
      if (!(await UsersInfo.findOne({ where: { user_id } }))) {
        throwError(211, "Mã người dùng không tồn tại!");
      }

      if (!(await Products.findOne({ where: { product_id } }))) {
        throwError(212, "Mã sản phẩm không tồn tại!");
      }

      await Ratings.create({
        user_id,
        product_id,
        start_amount: start_amount ? start_amount : 0,
        content,
      });
      return "Đã thêm đánh giá sản phẩm thành công!";
    } catch (error) {
      throw error;
    }
  },

  // API giỏ hàng
  cartsMD: async ({ user_id }) => {
    try {
      const carts = await Carts.findAll({
        where: { user_id },
        attributes: ["cart_id", "vip", "created_at", "updated_at"],
        include: [
          {
            model: Products,
            as: "product",
          },
        ],
      });

      return [...carts].map((item) => {
        const price_sale = item?.product?.sale
          ? item?.product?.price -
            (item?.product?.price * item?.product?.sale) / 100
          : undefined;

        return {
          cart_id: item?.cart_id,
          product_id: item?.product?.product_id,
          image: item?.product?.image,
          name: item?.product?.name,
          rating: 4,
          price: item?.product?.price,
          price_sale: item?.product?.sale
            ? item?.product?.price -
              (item?.product?.price * item?.product?.sale) / 100
            : undefined,
          vip: item?.vip ? `Giảm ${item?.vip}%` : "Không vip",
          money_number: !item?.vip
            ? price_sale
            : price_sale
            ? price_sale - (price_sale * item?.vip) / 100
            : item?.product?.price - (item?.product?.price * item?.vip) / 100,
          created_at: item?.created_at,
          updated_at: item?.updated_at,
        };
      });
    } catch (error) {
      throw error;
    }
  },

  createCartsMD: async ({ user_id, product_id, vip }) => {
    try {
      let vip_result;

      switch (vip) {
        case "1":
          vip_result = 5;
          break;
        case "2":
          vip_result = 10;
          break;
        case "3":
          vip_result = 15;
          break;
        case "4":
          vip_result = 20;
          break;
        default:
          vip_result = 0;
          break;
      }

      if (!(await UsersInfo.findOne({ where: { user_id } }))) {
        throwError(211, "Mã người dùng Không tồn tại!");
      }

      if (!(await Products.findOne({ where: { product_id } }))) {
        throwError(212, "Mã sản phẩm Không tồn tại!");
      }

      if (await Carts.findOne({ where: { product_id } })) {
        throwError(213, "Sản phẩm này đã có trong giỏ hàng!");
      }

      return await Carts.create({ user_id, product_id, vip: vip_result });
    } catch (error) {
      throw error;
    }
  },

  removeCartsMD: async ({ ids }) => {
    try {
      if (!ids[0]) {
        throwError(240, "Lỗi code không kiểm tra null!");
      }
      ids.forEach(async (id) => {
        await Carts.destroy({ where: { cart_id: id } });
      });
      return ids;
    } catch (error) {
      throw error;
    }
  },

  // API đơn hàng khách hàng
  ordersMD: async ({ user_id }) => {
    try {
      return [
        ...(await CustomerOrders.findAll({
          where: { user_id },
          include: [
            {
              model: Products,
              as: "orders",
            },
          ],
        })),
      ]
        .map((item) => {
          return {
            id_order: item?.id_order,
            product_id: item?.orders?.product_id,
            order_code: item?.order_code,
            image: item?.orders?.image,
            name: item?.orders?.name,
            price: item?.purchase_price,
            created_at: item?.created_at,
            updated_at: item?.updated_at,
          };
        })
        .reverse();
    } catch (error) {
      throw error;
    }
  },

  createOrdersCT: async ({ user_id, products, total_money }) => {
    try {
      if (!products.length) {
        throwError(204, "Lỗi code không kiểm tra null!");
      }

      const user = await UsersInfo.findOne({ where: { user_id } });

      if (!user) {
        throwError(211, "Mã người dùng không tồn tại!");
      }

      if (Number(user.account_money) < Number(total_money)) {
        throwError(
          211,
          "Số tiền trong tài khoản của bạn không đủ, vui lòng nạp thêm!"
        );
      }

      await UsersInfo.update(
        {
          account_money: Number(user.account_money) - Number(total_money),
        },
        { where: { user_id } }
      );

      products.forEach(async (item) => {
        await CustomerOrders.create({
          order_code: generateRandomCode(
            `1234567890`,
            "QWERTYUIOPASDFGHJKLZXCVBNM",
            8
          ),
          user_id,
          product_id: item.product_id,
          purchase_price: item.price,
        });

        await Carts.destroy({ where: { product_id: item.product_id } });
      });

      return "Đã thêm đơn hàng thành công!";
    } catch (error) {
      throw error;
    }
  },
};
