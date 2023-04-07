import { Router } from "express";

const infocinemaRouter = Router();

// Lấy dữ liệu từ db
infocinemaRouter.get("/layDanhSachRap", layDanhSachRap);
infocinemaRouter.get(
  "/layDanhSachRapPhimPhanTrang",
  layDanhSachRapPhimPhanTrang
);
// Gửi dữ liệu vào db
infocinemaRouter.post("/themRapPhim", themRapPhim);
// Cập nhật dữ liệu

infocinemaRouter.put("/:id", (req, res, next) => {
  var id = req.params.id;
  var password = req.body.password;
  infocinemaModel
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

infocinemaRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  infocinemaModel
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

export default infocinemaRouter;
