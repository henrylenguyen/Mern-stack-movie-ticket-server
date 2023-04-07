import { Router } from "express";
import { layDanhSachBanner } from "../controllers/banner.controller.js";
import { kiemTra } from "../utils/config.js";


const bannerRouter = Router();

// Lấy dữ liệu từ db

bannerRouter.get("/layDanhSachBanner",kiemTra, layDanhSachBanner);



bannerRouter.put("/:id", (req, res, next) => {
  var id = req.params.id;
  var password = req.body.password;
  bannerModel
    .findByIdAndUpdate(id, {
      password: password,
    })
    .then((data) => {
      res.json("Cập nhật thành công");
    })
    .catch((err) => {
      res.json("Lỗi");
    });
});

// Xóa dữ liệu trong db

bannerRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  bannerModel
    .deleteOne({
      _id: id,
    })
    .then((data) => {
      res.json("Xóa thành công");
    })
    .catch((err) => {
      res.json("Lỗi");
    });
});

export default bannerRouter;
