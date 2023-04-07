import { Router } from "express";
import { layDanhSachBanner } from "../controllers/banner.controller.js";


const bannerRouter = Router();

// Lấy dữ liệu từ db

bannerRouter.get("/layDanhSachBanner", layDanhSachBanner);


export default bannerRouter;