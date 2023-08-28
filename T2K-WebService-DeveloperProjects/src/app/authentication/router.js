module.exports = (router) => {
  const commonRoute = "/api/v1";
  const controller = require("./controller");
  const { authenticateToken } = require("../middlewares/index");

  // API mở file ảnh hoặc video
  router.get("/uploads/:name", (req, res) => {
    console.log(req.params);
    const fileName = req.params.name;
    const options = {
      root: "uploads",
      headers: {
        "Content-Type": fileName.endsWith(".mp4") ? "video/mp4" : "image",
      },
    };
    res.sendFile(fileName, options, (err) => {
      if (err) {
        console.error(err);
        res.status(500).end();
      }
    });
  });

  // API đăng ký tài khoản
  router.post(`${commonRoute}/account/register`, controller.registerCT);

  // API đăng nhập tài khoản
  router.post(`${commonRoute}/account/login`, controller.loginCT);

  // API lấy thông tin người dùng
  router.get(
    `${commonRoute}/user-info`,
    authenticateToken,
    controller.userInfoCT
  );

  // API cập nhật thông tin người dùng
  router.put(`${commonRoute}/user-info`, controller.updateUserInfoCT);
};
