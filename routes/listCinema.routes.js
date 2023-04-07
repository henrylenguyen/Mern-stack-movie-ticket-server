import { Router } from "express";

const listCinemaRouter = Router();

// Lấy dữ liệu từ db
listCinemaRouter.get("/layDanhSachRap", layDanhSachRap);
listCinemaRouter.get(
  "/layDanhSachRapPhimPhanTrang",
  layDanhSachRapPhimPhanTrang
);
// Gửi dữ liệu vào db
listCinemaRouter.post("/themRapPhim", themRapPhim);
// Cập nhật dữ liệu

listCinemaRouter.put("/:id", (req, res, next) => {
  var id = req.params.id;
  var password = req.body.password;
  listCinemaModel
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

listCinemaRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  listCinemaModel
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

export default listCinemaRouter;
