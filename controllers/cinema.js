import flimModel from "../models/flim.model.js";

//Phân trang phim
export const layDanhSachRapPhimPhanTrang = async (req, res, next) => {
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
      const total = await flimModel.countDocuments({});
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
      const data = await flimModel.find({}).skip(soLuongBoQua).limit(PAGE_SIZE);
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

export const layDanhSachRapPhim = (req, res, next) => {
  flimModel
    .find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json("Lỗi");
    });
};

export const themRapPhim = (req, res, next) => {
  const maHeThongRap = req.body.maHeThongRap;
  const biDanh = req.body.biDanh;
  const trailer = req.body.trailer;
  const hinhAnh = req.body.hinhAnh;
  flimModel
    .findOne({
      $or: [
        { maHeThongRap: maHeThongRap },
        { biDanh: biDanh },
        { tenHeThongRap: tenHeThongRap },
        { logo: logo },
      ],
    })
    .then((flim) => {
      if (flim) {
        // trả về thông báo tương ứng
        if (flim.maHeThongRap === maHeThongRap) {
          res.status(400).json({ message: "Phim đã tồn tại" });
        } else if (flim.biDanh === biDanh) {
          res.status(400).json({ message: "Bí danh đã tồn tại" });
        } else if (flim.trailer === trailer) {
          res.status(400).json({ message: "Trailer đã tồn tại" });
        } else if (flim.trailer === trailer) {
          res.status(400).json({ message: "Hình ảnh đã tồn tại" });
        }
      } else {
      }
    })
    .then((flim) => {
      res.json({ message: "Thêm mới thành công" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Lỗi" });
    });
};
