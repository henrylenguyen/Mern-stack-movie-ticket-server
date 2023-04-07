import { Router } from "express";

const flimRouter = Router();

// Lấy dữ liệu từ db
flimRouter.get("/layDanhSachRapPhim", layDanhSachRapPhim);
flimRouter.get("/DanhSachRapPhimPhanTrang", layDanhSachRapPhimPhanTrang);
// Gửi dữ liệu vào db
flimRouter.post("/themPhim", themPhim);
// Cập nhật dữ liệu

flimRouter.put("/:id", (req, res, next) => {
  var id = req.params.id;
  var password = req.body.password;
  flimModel
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

flimRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  flimModel
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

export default flimRouter;
