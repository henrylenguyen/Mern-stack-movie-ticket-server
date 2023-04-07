import bannerModel from "../models/banner.model.js";

//------------------------------------------------PHÂN TRANG BANNER--------------------------------
export const layDanhSachBannerPhanTrang = async (req, res, next) => {
  let page = req.query.soTrang;
  let PAGE_SIZE = req.query.SoPhanTuTrenTrang;
  if (page) {
    // Lấy theo phân trang
    if (page < 1) {
      page = 1;
    }

    page = parseInt(page);
    let soLuongBoQua = (page - 1) * PAGE_SIZE;
    try {
      const total = await bannerModel.countDocuments({});
      if (soLuongBoQua >= total) {
        return res.json({
          content: {
            tongSoTrang: Math.ceil(total / PAGE_SIZE),
            trangHienTai: page,
            tongSoLuongHienCo: total,
            soPhanTuHienTai: 0,
            data: [],
          },
        });
      }
      let soLuongPhanTuHienTai = PAGE_SIZE;
      if (PAGE_SIZE > total) {
        soLuongPhanTuHienTai = total;
      } else if (total - soLuongBoQua < PAGE_SIZE) {
        soLuongPhanTuHienTai = total - soLuongBoQua;
      }
      const data = await bannerModel
        .find({})
        .skip(soLuongBoQua)
        .limit(PAGE_SIZE);
      let tongSoTrang = Math.ceil(total / PAGE_SIZE);
      if (page > tongSoTrang) {
        return res.json({
          content: {
            tongSoTrang: tongSoTrang,
            trangHienTai: page,
            tongSoLuongHienCo: total,
            soPhanTuHienTai: 0,
            data: [],
          },
        });
      }
      res.json({
        content: {
          tongSoTrang: tongSoTrang,
          trangHienTai: page,
          tongSoLuongHienCo: total,
          soPhanTuHienTai: parseInt(soLuongPhanTuHienTai),
          data: data,
        },
      });
    } catch (err) {
      res.json("Lỗi");
    }
  }
};
//------------------------------------------------LẤY DANH SÁCH BANNER--------------------------------
export const layDanhSachBanner = (req, res, next) => {
  bannerModel
    .find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json("Lỗi");
    });
};
//------------------------------------------------THÊM BANNER MỚI--------------------------------
export const themBanner = (req, res, next) => {
  const maPhim = req.body.maPhim;
  const hinhAnh = req.body.hinhAnh;
  bannerModel
    .findOne({
      $or: [{ maPhim: maPhim }, { hinhAnh: hinhAnh }],
    })
    .then((banner) => {
      if (banner) {
        // username hoặc email đã tồn tại, trả về thông báo tương ứng
        if (banner.maPhim === tenPhim) {
          res.status(400).json({ message: "Mã phim đã tồn tại" });
        } else {
          res.status(400).json({ message: "Hình ảnh đã tồn tại" });
        }
      } else {
      }
    })
    .then((banner) => {
      res.json({ message: "Thêm mới thành công" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Lỗi" });
    });
};
