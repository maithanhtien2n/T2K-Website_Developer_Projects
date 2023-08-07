const { Account, UsersInfo } = require("./config");
const { throwError } = require("../../utils/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  registerMD: async ({
    full_name,
    phone_number,
    day_of_birth,
    gender,
    user_name,
    password,
  }) => {
    // Mã hóa mật khẩu
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      const accountInfo = await Account.findOne({ where: { user_name } });

      if (accountInfo) {
        throwError(210, "Tên người dùng đã tồn tại!");
      }

      const account = await Account.create({
        user_name,
        password: hashedPassword,
        role: "user",
      });

      await UsersInfo.create({
        account_id: account.account_id,
        full_name,
        phone_number,
        day_of_birth,
        gender,
        account_money: 0,
      });

      return "Đăng ký tài khoản thành công!";
    } catch (error) {
      throw error;
    }
  },

  loginMD: async ({ user_name, password }) => {
    try {
      const account = await Account.findOne({ where: { user_name } });

      if (!account || !bcrypt.compareSync(password, account.password)) {
        throwError(205, "Tên tài khoản hoặc mật khẩu không chính xác!");
      }

      return {
        account_id: account.account_id,
        token: jwt.sign(
          {
            account_id: account.account_id,
            user_name: account.user_name,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        ),
      };
    } catch (error) {
      throw error;
    }
  },

  userInfoMD: async ({ account_id, user_name }) => {
    try {
      const userInfo = await UsersInfo.findOne({ where: { account_id } });
      return { account_id, user_name, user_info: userInfo };
    } catch (error) {
      throw error;
    }
  },
};
