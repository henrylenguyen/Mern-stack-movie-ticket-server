import bannerModel from "../models/banner.model.js";
import flimModel from "../models/flim.model.js";
//------------------------------------------------LẤY DANH SÁCH BANNER--------------------------------

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
        data,
      },
    });
  } catch (err) {
    res.json("Lỗi");
  }
};

//------------------------------------------------THÊM BANNER MỚI--------------------------------
export const themBanner = (req, res, next) => {
  const maPhim = req.body.maPhim;
  const hinhAnh = req.body.hinhAnh;
  bannerModel
    .findOne({
      maPhim: parseInt(maPhim),
    })
    .then((banner) => {
      if (banner) {
        if (banner.maPhim === tenPhim) {
          res.status(400).json({ message: "Mã phim đã tồn tại" });
        }
      } 
    })
    .then((banner) => {
      res.json({ message: "Thêm mới thành công" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Lỗi" });
    });
};
