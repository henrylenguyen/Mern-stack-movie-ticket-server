import infocinemaModel from "../models/infocinemaModel.model.js";

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
      const total = await infocinemaModel.countDocuments({});
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
      const data = await infocinemaModel
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

export const layDanhSachRap = (req, res, next) => {
  infocinemaModel
    .find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json("Lỗi");
    });
};

export const themRapPhim = (req, res, next) => {
  const maCumRap = req.body.maCumRap;
  const tenCumRap = req.body.tenCumRap;
  const diaChi = req.body.diaChi;
  const danhSachRap = req.body.danhSachRap;
  infocinemaModel
    .findOne({
      $or: [
        { maCumRap: maCumRap },
        { tenCumRap: tenCumRap },
        { diaChi: diaChi },
        { danhSachRap: danhSachRap },
      ],
    })
    .then((infocinema) => {
      if (infocinema) {
        // username hoặc email đã tồn tại, trả về thông báo tương ứng
        if (infocinema.maCumRap === maCumRap) {
          res.status(400).json({ message: "Mã cụm rạp đã tồn tại" });
        } else if (infocinema.tenCumRap === tenCumRap) {
          res.status(400).json({ message: "Tên cụm rạp đã tồn tại" });
        } else if (infocinema.diaChi === diaChi) {
          res.status(400).json({ message: "Địa chỉ đã tồn tại" });
        } else if (infocinema.danhSachRap === danhSachRap) {
          res.status(400).json({ message: "Danh sách rạp phim đã tồn tại" });
        }
      } else {
      }
    })
    .then((infocinema) => {
      res.json({ message: "Thêm mới thành công" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Lỗi" });
    });
};
