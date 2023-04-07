import { Router } from "express";

const infoflimRouter = Router();

// Lấy dữ liệu từ db
infoflimRouter.get("/layDanhSachPhim", layDanhSachPhim);
infoflimRouter.get("/DanhSachPhimPhanTrang", layDanhSachPhimPhanTrang);
// Gửi dữ liệu vào db
infoflimRouter.post("/themPhim", themPhim);
// Cập nhật dữ liệu

infoflimRouter.put("/:id", (req, res, next) => {
  var id = req.params.id;
  var password = req.body.password;
  infoflimModel
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

infoflimRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  infoflimModel
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

export default infoflimRouter;
