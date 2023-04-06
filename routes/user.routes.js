import { Router } from "express";
import {
  capNhatThongTinNguoiDung,
  layDanhSachNguoiDung,
  layDanhSachNguoiDungPhanTrang,
  dangKy,
  xoaNguoiDung,
  dangNhap,
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

// Đăng kí thành viên

accountRouter.post("/dangKy",dangKy)


// Cập nhật dữ liệu

accountRouter.put("/capNhatThongTinNguoiDung",kiemTra,capNhatThongTinNguoiDung)

// Xóa dữ liệu trong db

accountRouter.delete("/xoaNguoiDung",kiemTra,xoaNguoiDung)

// đăng nhập

accountRouter.post("/dangNhap",dangNhap)

export default accountRouter;
