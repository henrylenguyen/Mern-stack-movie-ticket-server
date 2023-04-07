import infoflimModel from "../models/infoflim.model.js";

export const layDanhSachThongTinPhim = async (req, res, next) => {
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
      const total = await infoflimModel.countDocuments({});
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

export const layThongTinPhim = (req, res, next) => {
  infoflimModel
    .find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json("Lỗi");
    });
};

export const themThongTinPhim = (req, res, next) => {
  const daoDien = req.body.daoDien;
  const dienVien = req.body.dienVien;
  const doTuoi = req.body.doTuoi;
  const theLoai = req.body.theLoai;
  infoflimModel
    .findOne({
      $or: [
        { daoDien: daoDien },
        { dienVien: dienVien },
        { doTuoi: doTuoi },
        { theLoai: theLoai },
      ],
    })
    .then((infoflim) => {
      if (infoflim) {
        // if (flim.tenPhim === tenPhim) {
        //   res.status(400).json({ message: "Phim đã tồn tại" });
        // } else if (flim.biDanh === biDanh) {
        //   res.status(400).json({ message: "Bí danh đã tồn tại" });
        // } else if (flim.trailer === trailer) {
        //   res.status(400).json({ message: "Trailer đã tồn tại" });
        // } else if (flim.hinhAnh === hinhAnh) {
        //   res.status(400).json({ message: "Hình ảnh đã tồn tại" });
        // } else if (flim.thongTinPhim === thongTinPhim) {
        //   res.status(400).json({ message: "Thông tin phim đã tồn tại" });
        // }
      } else {
      }
    })
    .then((infoflim) => {
      res.json({ message: "Thêm mới thành công" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Lỗi" });
    });
};
