import { Router } from "express";
import {
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
  layDanhSachNguoiDung
);
accountRouter.get("/DanhSachNguoiDungPhanTrang", layDanhSachNguoiDungPhanTrang);

// Gửi dữ liệu vào db

accountRouter.post("/themNguoiDung",themNguoiDung)


// Cập nhật dữ liệu

accountRouter.put("/:id",(req,res,next)=>{
  var id = req.params.id;
  var password = req.body.password;
  AccountModel.findByIdAndUpdate(id,{
    password:password
  }).then(data=>{
    res.json("Cập nhật thành công")
  }).catch(err=>{
    res.json("Lỗi")
  })
})

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
