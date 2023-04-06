import flimModel from "../models/flim.model.js";

//Phân trang phim
export const layDanhSachPhimPhanTrang = async (req, res, next) => {
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

export const layDanhSachPhim = (req, res, next) => {
  flimModel
    .find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json("Lỗi");
    });
};

export const themPhim = (req, res, next) => {
  const tenPhim = req.body.tenPhim;
  const biDanh = req.body.biDanh;
  const trailer = req.body.trailer;
  const hinhAnh = req.body.hinhAnh;
  const moTa = req.body.moTa;
  const ngayKhoiChieu = req.body.ngayKhoiChieu;
  const danhGia = req.body.danhGia;
  const hot = req.body.hot;
  const dangChieu = req.body.dangChieu;
  const sapChieu = req.body.sapChieu;
  const thongTinPhim = req.body.thongTinPhim;
  flimModel
    .findOne({
      $or: [
        { tenPhim: tenPhim },
        { biDanh: biDanh },
        { trailer: trailer },
        { hinhAnh: hinhAnh },
        { moTa: moTa },
        { ngayKhoiChieu: ngayKhoiChieu },
        { danhGia: danhGia },
        { hot: hot },
        { dangChieu: dangChieu },
        { sapChieu: sapChieu },
        { thongTinPhim: thongTinPhim },
      ],
    })
    .then((flim) => {
      if (flim) {
        // username hoặc email đã tồn tại, trả về thông báo tương ứng
        if (flim.tenPhim === tenPhim) {
          res.status(400).json({ message: "Phim đã tồn tại" });
        } else if (flim.biDanh === biDanh) {
          res.status(400).json({ message: "Bí danh đã tồn tại" });
        } else if (flim.trailer === trailer) {
          res.status(400).json({ message: "Trailer đã tồn tại" });
        } else if (flim.hinhAnh === hinhAnh) {
          res.status(400).json({ message: "Hình ảnh đã tồn tại" });
        } else if (flim.thongTinPhim === thongTinPhim) {
          res.status(400).json({ message: "Thông tin phim đã tồn tại" });
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
