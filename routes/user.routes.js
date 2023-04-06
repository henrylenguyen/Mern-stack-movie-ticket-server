import { Router } from "express";
import {
  capNhatThongTinNguoiDung,
  layDanhSachNguoiDung,
  layDanhSachNguoiDungPhanTrang,
  themNguoiDung,
} from "../controllers/user.controller.js";
import fs from "fs"
import kiemTra from "../utils/config.js";


const accountRouter = Router();


// Lấy dữ liệu từ db
accountRouter.get(
  "/layDanhSachNguoiDung",
  kiemTra,
  layDanhSachNguoiDung
);
accountRouter.get("/DanhSachNguoiDungPhanTrang",kiemTra, layDanhSachNguoiDungPhanTrang);

// Gửi dữ liệu vào db

accountRouter.post("/themNguoiDung",kiemTra,themNguoiDung)


// Cập nhật dữ liệu

accountRouter.put("/capNhatThongTinNguoiDung",kiemTra,capNhatThongTinNguoiDung)

// Xóa dữ liệu trong db

accountRouter.delete("/:id",(req,res,next)=>{
  const id = req.params.id;
  AccountModel.deleteOne({
    _id:id
  }).then(data=>{
    res.json("Xóa thành công")
  }).catch(err=>{
    res.json("Lỗi")
  })
})

export default accountRouter;
