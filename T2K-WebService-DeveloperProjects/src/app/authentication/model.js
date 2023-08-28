const { Account, UsersInfo } = require("./config");
const { throwError } = require("../../utils/index");
const {
  onUrlFile,
  onImagePath,
  onSaveFile,
  onDeleteFile,
} = require("../../utils/upload");
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
        vip: 0,
        full_name,
        phone_number: Number(phone_number),
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

  updateUserInfoMD: async ({
    user_id,
    image,
    full_name,
    phone_number,
    day_of_birth,
    gender,
    host,
  }) => {
    try {
      const imagePath = image ? onImagePath(image.name) : undefined;

      const userInfo = await UsersInfo.findOne({ where: { user_id } });

      if (!userInfo) {
        throwError(201, `Không tồn tại người dùng có id là: ${user_id}`);
      }

      if (userInfo.image && image) {
        onDeleteFile(userInfo.image);
      }

      await UsersInfo.update(
        {
          image: image ? onUrlFile(host, imagePath) : undefined,
          full_name,
          phone_number,
          day_of_birth,
          gender,
        },
        { where: { user_id } }
      );

      if (image) {
        onSaveFile(imagePath, image.base64);
      }

      return "Cập nhật thông tin thành công!";
    } catch (error) {
      throw error;
    }
  },
};
