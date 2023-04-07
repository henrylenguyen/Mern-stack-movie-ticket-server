import { Router } from "express";
import {
  capNhatThongTinNguoiDung,
  layDanhSachNguoiDung,
  layDanhSachNguoiDungPhanTrang,
  dangKy,
  xoaNguoiDung,
  dangNhap,
  layThongTinNguoiDung,
  layThongTinTaiKhoan,
  timKiemNguoiDung,
  timKiemNguoiDungPhanTrang,
} from "../controllers/user.controller.js";
import fs from "fs"
import {errorHandler, kiemTra, kiemTraTokenNguoiDung} from "../utils/config.js";


const accountRouter = Router();


// Lấy dữ liệu từ db
accountRouter.get(
  "/layDanhSachNguoiDung",
  kiemTra,
  layDanhSachNguoiDung
);
accountRouter.get("/DanhSachNguoiDungPhanTrang",kiemTra, layDanhSachNguoiDungPhanTrang);

// Đăng kí thành viên

accountRouter.post("/dangKy",kiemTra,dangKy)


// Cập nhật dữ liệu

accountRouter.put("/capNhatThongTinNguoiDung",kiemTra,kiemTraTokenNguoiDung,capNhatThongTinNguoiDung)

// Xóa dữ liệu trong db

accountRouter.delete("/xoaNguoiDung",kiemTra,kiemTraTokenNguoiDung,xoaNguoiDung)

// đăng nhập

accountRouter.post("/dangNhap",kiemTra,dangNhap)

// Lấy thông tin người dùng
// Lấy 1 dữ liệu từ db

accountRouter.get("/layThongTinNguoiDung",kiemTra,kiemTraTokenNguoiDung,layThongTinNguoiDung)
accountRouter.get("/layThongTinTaiKhoan",kiemTra,kiemTraTokenNguoiDung,layThongTinTaiKhoan)
accountRouter.get("/timKiemNguoiDung",kiemTra,kiemTraTokenNguoiDung,timKiemNguoiDung)
accountRouter.get("/timKiemNguoiDungPhanTrang",kiemTra,kiemTraTokenNguoiDung,timKiemNguoiDungPhanTrang)

export default accountRouter;
