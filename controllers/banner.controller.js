import bannerModel from "../models/banner.model.js";
import flimModel from "../models/flim.model.js";

export const layDanhSachBanner = async (req, res, next) => {
  try {
    const data = await bannerModel
      .find({}, { _id: 0 })
      .populate({
        path: "maPhim",
        model: flimModel,
        select: "-_id",
      })
      .lean(); // trả về kiểu js thuần để có thể map dữ liệu
    
    res.json({
      content: {
        data: data,
      },
    });
  } catch (err) {
    res.json("Lỗi");
  }
};