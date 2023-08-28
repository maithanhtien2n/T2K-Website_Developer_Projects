const model = require("./model");
const { onResponse } = require("../../utils/index");

module.exports = {
  registerCT: async (req, res) => {
    await onResponse(req, res, model.registerMD, {
      checkData: [
        "full_name",
        "phone_number",
        "day_of_birth",
        "gender",
        "user_name",
        "password",
      ],
      data: ({
        full_name,
        phone_number,
        day_of_birth,
        gender,
        user_name,
        password,
      } = req.body),
    });
  },

  loginCT: async (req, res) => {
    await onResponse(req, res, model.loginMD, {
      checkData: ["user_name", "password"],
      data: ({ user_name, password } = req.body),
      message: "Đăng nhập thành công!",
    });
  },

  userInfoCT: async (req, res) => {
    await onResponse(req, res, model.userInfoMD, {
      data: { account_id: req.data.account_id, user_name: req.data.user_name },
    });
  },

  updateUserInfoCT: async (req, res) => {
    const { user_id, image, full_name, phone_number, day_of_birth, gender } =
      req.body;
    await onResponse(req, res, model.updateUserInfoMD, {
      checkData: [
        "user_id",
        "full_name",
        "phone_number",
        "day_of_birth",
        "gender",
      ],
      data: {
        user_id,
        image,
        full_name,
        phone_number,
        day_of_birth,
        gender,
        host: req.headers.host,
      },
      message: "Cập nhật dữ liệu thành công!",
    });
  },
};
