import categoryModel from "../models/category.model.js";

//Phân trang phim
export const layDanhSachTheLoaiPhim = async (req, res, next) => {
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
      const total = await categoryModel.countDocuments({});
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
      const data = await filmModel.find({}).skip(soLuongBoQua).limit(PAGE_SIZE);
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

export const layDanhSachTheLoai = (req, res, next) => {
  categoryModel
    .find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json("Lỗi");
    });
};

export const themTheLoaiPhim = (req, res, next) => {
  const ten = req.body.ten;
  categoryModel
    .findOne({
      $or: [{ ten: ten }],
    })
    .then((category) => {
      if (category) {
        // username hoặc email đã tồn tại, trả về thông báo tương ứng
        if (film.ten === ten) {
          res.status(400).json({ message: "Tên thể loại phim đã tồn tại" });
        }
      } else {
      }
    })
    .then((category) => {
      res.json({ message: "Thêm mới thành công" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Lỗi" });
    });
};
