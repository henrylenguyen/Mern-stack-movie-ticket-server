import { Router } from "express";
import { layDanhSachPhim, layDanhSachPhimHot, layDanhSachPhimPhanTrang, layDanhSachPhimSapChieu, layDanhSachPhimSapChieuPhanTrang } from './../controllers/flim.controller.js';
import { kiemTra } from "../utils/config.js";

const flimRouter = Router();

// Lấy dữ liệu từ db
flimRouter.get("/layDanhSachPhim",kiemTra, layDanhSachPhim);
// Phim phân trang
flimRouter.get("/DanhSachPhimPhanTrang",kiemTra, layDanhSachPhimPhanTrang);
// phim sắp chiếu
flimRouter.get("/layDanhSachPhimSapChieu", layDanhSachPhimSapChieu);

// phim sắp chiếu phân trang
flimRouter.get("/layDanhSachPhimSapChieuPhanTrang", layDanhSachPhimSapChieuPhanTrang);
// phim đang hot
flimRouter.get("/layDanhSachPhimHot", layDanhSachPhimHot);

export default flimRouter;
