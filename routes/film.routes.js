import { Router } from "express";
import { layDanhSachPhim, layDanhSachPhimHot, layDanhSachPhimPhanTrang, layDanhSachPhimSapChieu, layDanhSachPhimSapChieuPhanTrang, layThongTinPhim, xoaPhim } from './../controllers/film.controller.js';
import { kiemTra, kiemTraTokenNguoiDung } from "../utils/config.js";

const filmRouter = Router();

// Lấy dữ liệu từ db
filmRouter.get("/layDanhSachPhim",kiemTra, layDanhSachPhim);
// Phim phân trang
filmRouter.get("/DanhSachPhimPhanTrang",kiemTra, layDanhSachPhimPhanTrang);
// phim sắp chiếu
filmRouter.get("/layDanhSachPhimSapChieu",kiemTra, layDanhSachPhimSapChieu);

// phim sắp chiếu phân trang
filmRouter.get("/layDanhSachPhimSapChieuPhanTrang", kiemTra,layDanhSachPhimSapChieuPhanTrang);
// phim đang hot
filmRouter.get("/layDanhSachPhimHot",kiemTra, layDanhSachPhimHot);
// lấy thông tin phim
filmRouter.get("/layThongTinPhim",kiemTra,layThongTinPhim);
// xóa phim
filmRouter.delete("/xoaPhim",kiemTra,kiemTraTokenNguoiDung, xoaPhim);

export default filmRouter;
