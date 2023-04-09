import bannerModel from "../models/banner.model.js";
import filmInforModel from "../models/filmInfor.model.js";
import filmModel from "../models/film.model.js";
import filmGenreModel from "../models/genres.model.js";
//------------------------------------------------LẤY DANH SÁCH BANNER--------------------------------

export const layDanhSachBanner = async (req, res, next) => {
  try {
    const data = await bannerModel
      .find({}, { _id: 0 })
      .populate({
        path: "maPhim",
        model: filmModel,
        select: "-_id",
        populate: {
          path: "thongTinPhim",
          model: filmInforModel,
          select: "-_id",
          populate: {
            path: "theLoai",
            model: filmGenreModel,
            select: "-_id ten", // Thêm projection để chỉ lấy thuộc tính "ten"
          },
        },
      })
      .lean(); // trả về kiểu js thuần để có thể map dữ liệu
    // Map dữ liệu để chỉ lấy giá trị "ten" của các đối tượng trong mảng "theLoai"
    const mappedData = data.map((banner) => {
      const theLoai = banner.maPhim.thongTinPhim.theLoai.map((tl) => tl.ten);
      return {
        ...banner,
        chiTietPhim: {
          ...banner.maPhim,
          thongTinPhim: { ...banner.maPhim.thongTinPhim, theLoai },
        },
      };
    });
    // Xóa thuộc tính "maPhim" và trả về kết quả
    res.json({
      content: mappedData.map(({ maPhim, ...rest }) => rest),
    });
  } catch (err) {
    res.json("Lỗi");
  }
};


//------------------------------------------------THÊM BANNER MỚI--------------------------------
