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
          include: [
            {
              model: CustomerOrders,
              as: "sold",
            },
          ],
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
          sold: item?.sold.length,
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
            model: CustomerOrders,
            as: "sold",
          },
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
                attributes: ["user_id", "image", "full_name"],
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
        sale: item?.sale ? `Sale ${item?.sale}%` : undefined,
        price_sale: item?.sale
          ? item?.price - (item?.price * item?.sale) / 100
          : undefined,
        description: item?.description,
        sold: item?.sold.length,
        amount_evaluate: item?.evaluate.length,
        total_evaluate: !isNaN(
          (
            +item?.evaluate
              .filter(
                ({ start_amount }) => start_amount !== 0 && start_amount !== -1
              )
              .reduce((start, { start_amount }) => start + start_amount, 0) /
            item?.evaluate.filter(
              ({ start_amount }) => start_amount !== 0 && start_amount !== -1
            ).length
          ).toFixed(1)
        )
          ? (
              +item?.evaluate
                .filter(
                  ({ start_amount }) =>
                    start_amount !== 0 && start_amount !== -1
                )
                .reduce((start, { start_amount }) => start + start_amount, 0) /
              item?.evaluate.filter(
                ({ start_amount }) => start_amount !== 0 && start_amount !== -1
              ).length
            ).toFixed(1)
          : null,
        evaluate: item?.evaluate
          .map((item) => {
            return {
              user_id: item?.user?.user_id,
              rating_id: item?.rating_id,
              image: item?.user?.image,
              full_name: item?.user?.full_name,
              start_key: item?.start_amount,
              start_amount:
                item?.start_amount === 0 || item?.start_amount === -1
                  ? item?.start_amount === 0
                    ? "Chưa trải nghiệm sản phẩm"
                    : "Từng trải nghiệm sản phẩm"
                  : item?.start_amount,
              content: item?.content,
              created_at: item?.created_at,
              updated_at: item?.updated_at,
            };
          })
          .reverse()
          .sort((a, b) => {
            if (a.start_key === 0 || a.start_key === -1) {
              return 1;
            }
            if (b.start_key === 0 || b.start_key === -1) {
              return -1;
            }

            return 0;
          }),
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
        attributes: ["cart_id", "created_at", "updated_at"],
        include: [
          {
            model: Products,
            as: "product",
          },
          {
            model: UsersInfo,
            as: "user",
          },
        ],
      });

      return [...carts].map((item) => {
        // Tính kết quả nếu có sale còn không có sale thì undefined
        const price_sale = item?.product?.sale
          ? item?.product?.price -
            (item?.product?.price * item?.product?.sale) / 100
          : undefined;

        const vip = (value) => {
          switch (value) {
            case 1:
              return 5;
            case 2:
              return 10;
            case 3:
              return 15;
            case 4:
              return 20;
            default:
              return 0;
          }
        };

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
          vip: item?.user?.vip ? `Giảm ${vip(item?.user?.vip)}%` : "Không vip",
          money_number: !item?.user?.vip
            ? price_sale
              ? price_sale
              : item?.product?.price
            : price_sale
            ? price_sale - (price_sale * vip(item?.user?.vip)) / 100
            : item?.product?.price -
              (item?.product?.price * vip(item?.user?.vip)) / 100,
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

      if (await Carts.findOne({ where: { product_id, user_id } })) {
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

      for (const id of ids) {
        await Carts.destroy({ where: { cart_id: id } });
      }

      return ids;
    } catch (error) {
      throw error;
    }
  },

  // API đơn hàng khách hàng
  ordersMD: async ({ user_id, key_search }) => {
    try {
      const key = key_search ? key_search : "";
      return [
        ...(await CustomerOrders.findAll({
          where: { user_id },
          include: [
            {
              model: Products,
              as: "orders",
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
            },
          ],
        })),
      ]
        .map((item) => ({
          id_order: item?.id_order,
          product_id: item?.orders?.product_id,
          order_code: item?.order_code,
          image: item?.orders?.image,
          name: item?.orders?.name,
          price: item?.purchase_price,
          created_at: item?.created_at,
          updated_at: item?.updated_at,
        }))
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

      for (const item of products) {
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
      }

      return "Đã thêm đơn hàng thành công!";
    } catch (error) {
      throw error;
    }
  },
};
