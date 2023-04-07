import { Router } from "express";

const categoryRouter = Router();

// Lấy dữ liệu từ db

// Gửi dữ liệu vào db

// Cập nhật dữ liệu

categoryRouter.put("/:id", (req, res, next) => {
  var id = req.params.id;
  var password = req.body.password;
  categoryModel
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

categoryRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  categoryModel
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

export default categoryRouter;
