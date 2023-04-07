import { Router } from "express";
import { layDanhSachPhim, layDanhSachPhimHot, layDanhSachPhimPhanTrang, layDanhSachPhimSapChieu, layDanhSachPhimSapChieuPhanTrang, layThongTinPhim, xoaPhim } from './../controllers/flim.controller.js';
import { kiemTra, kiemTraTokenNguoiDung } from "../utils/config.js";

const flimRouter = Router();

// Lấy dữ liệu từ db
flimRouter.get("/layDanhSachPhim",kiemTra, layDanhSachPhim);
// Phim phân trang
flimRouter.get("/DanhSachPhimPhanTrang",kiemTra, layDanhSachPhimPhanTrang);
// phim sắp chiếu
flimRouter.get("/layDanhSachPhimSapChieu",kiemTra, layDanhSachPhimSapChieu);

// phim sắp chiếu phân trang
flimRouter.get("/layDanhSachPhimSapChieuPhanTrang", kiemTra,layDanhSachPhimSapChieuPhanTrang);
// phim đang hot
flimRouter.get("/layDanhSachPhimHot",kiemTra, layDanhSachPhimHot);
// lấy thông tin phim
flimRouter.get("/layThongTinPhim",kiemTra,layThongTinPhim);
// xóa phim
flimRouter.delete("/xoaPhim",kiemTra,kiemTraTokenNguoiDung, xoaPhim);

export default flimRouter;
