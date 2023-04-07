import flimInforModel from "../models/filmInfor.model.js";
import flimModel from "../models/flim.model.js";
import flimGenreModel from "../models/genres.model.js";

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
      const data = await flimModel
        .find({}, { _id: 0 })
        .populate({
          path: "thongTinPhim",
          model: flimInforModel,
          select: "-_id",
        })
        .populate({
          path: "thongTinPhim",
          populate: {
            path: "theLoai",
            model: flimGenreModel,
            select: "-_id",
          },
        })
        .lean() //trả về kiểu js thuần để có thể map dữ liệu
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
      const newData = data.map((item) => {
        const { thongTinPhim, ...rest } = item; // bóc tách mảng `theLoai` và các thuộc tính khác của đối tượng `item`
        const { theLoai, _id, ...rest2 } = thongTinPhim; // tiếp tục bóc tách mảng thongTinPhim để lấy ra theLoai
        const tenTheLoai = theLoai.map(({ ten }) => ten);
        return {
          ...rest,
          thongTinPhim: {
            ...rest2,
          },
          tenTheLoai,
        };
      });

      res.json({
        content: {
          tongSoTrang: tongSoTrang,
          trangHienTai: page,
          tongSoLuongHienCo: total,
          soPhanTuHienTai: parseInt(soLuongPhanTuHienTai),
          data: newData,
        },
      });
    } catch (err) {
      res.json("Lỗi");
    }
  } else {
    res.status(400).json("Phải có số trang và số phần tử trên trang");
  }
};

export const layDanhSachPhim = async (req, res, next) => {
  try {
    const data = await flimModel
      .find({}, { _id: 0 })
      .populate({
        path: "thongTinPhim",
        model: flimInforModel,
        select: "-_id",
      })
      .populate({
        path: "thongTinPhim",
        populate: {
          path: "theLoai",
          model: flimGenreModel,
          select: "-_id",
        },
      })
      .lean(); // trả về kiểu js thuần để có thể map dữ liệu

    const newData = data.map((item) => {
      const { thongTinPhim, ...rest } = item; // bóc tách mảng `theLoai` và các thuộc tính khác của đối tượng `item`
      const { theLoai, _id, ...rest2 } = thongTinPhim; // tiếp tục bóc tách mảng thongTinPhim để lấy ra theLoai
      const tenTheLoai = theLoai.map(({ ten }) => ten);
      return {
        ...rest,
        thongTinPhim: {
          ...rest2,
        },
        tenTheLoai,
      };
    });

    res.json({
      content: {
        data: newData,
      },
    });
  } catch (err) {
    res.json("Lỗi");
  }
};

// -------------------------------LẤY DANH SÁCH PHIM SẮP CHIẾU---------------
export const layDanhSachPhimSapChieu = async (req, res, next) => {
  try {
    const data = await flimModel
      .find(
        { ngayKhoiChieu: { $gte: new Date() } }, // lọc phim có ngày khởi chiếu sau ngày hiện tại
        { _id: 0 }
      )
      .populate({
        path: "thongTinPhim",
        model: flimInforModel,
        select: "-_id",
      })
      .populate({
        path: "thongTinPhim",
        populate: {
          path: "theLoai",
          model: flimGenreModel,
          select: "-_id",
        },
      })
      .lean();

    const newData = data.map((item) => {
      const { thongTinPhim, ...rest } = item;
      const { theLoai, _id, ...rest2 } = thongTinPhim;
      const tenTheLoai = theLoai.map(({ ten }) => ten);
      return {
        ...rest,
        thongTinPhim: {
          ...rest2,
        },
        tenTheLoai,
      };
    });

    res.json({
      content: {
        data: newData,
      },
    });
  } catch (err) {
    res.json("Lỗi");
  }
};

// ---------------------------------LẤY DANH SÁCH CHIẾU PHÂN TRANG------------------------

export const layDanhSachPhimSapChieuPhanTrang = async (req, res, next) => {
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
      const total = await flimModel.countDocuments({
        ngayKhoiChieu: { $gte: new Date() },
      });
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
      const data = await flimModel
        .find({ ngayKhoiChieu: { $gte: new Date() } }, { _id: 0 })
        .populate({
          path: "thongTinPhim",
          model: flimInforModel,
          select: "-_id",
        })
        .populate({
          path: "thongTinPhim",
          populate: {
            path: "theLoai",
            model: flimGenreModel,
            select: "-_id",
          },
        })
        .lean()
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
      const newData = data.map((item) => {
        const { thongTinPhim, ...rest } = item;
        const { theLoai, _id, ...rest2 } = thongTinPhim;
        const tenTheLoai = theLoai.map(({ ten }) => ten);
        return {
          ...rest,
          thongTinPhim: {
            ...rest2,
          },
          tenTheLoai,
        };
      });

      res.json({
        content: {
          tongSoTrang: tongSoTrang,
          trangHienTai: page,
          tongSoLuongHienCo: total,
          soPhanTuHienTai: parseInt(soLuongPhanTuHienTai),
          data: newData,
        },
      });
    } catch (err) {
      res.json("Lỗi");
    }
  } else {
    res.status(400).json("Phải có số trang và số phần tử trên trang");
  }
};

// ---------------------------------LẤY DANH SÁCH PHIM ĐANG HOT ------------------------------

export const layDanhSachPhimHot = async (req, res, next) => {
  try {
    const data = await flimModel
      .find(
        { hot: true }, // lọc phim đang hot
        { _id: 0 }
      )
      .sort({ danhGia: -1 }) // sắp xếp theo danhGia giảm dần
      .limit(10) // lấy 10 bộ phim đầu tiên
      .populate({
        path: "thongTinPhim",
        model: flimInforModel,
        select: "-_id",
      })
      .populate({
        path: "thongTinPhim",
        populate: {
          path: "theLoai",
          model: flimGenreModel,
          select: "-_id",
        },
      })
      .lean();

    const newData = data.map((item) => {
      const { thongTinPhim, ...rest } = item;
      const { theLoai, _id, ...rest2 } = thongTinPhim;
      const tenTheLoai = theLoai.map(({ ten }) => ten);
      return {
        ...rest,
        thongTinPhim: {
          ...rest2,
        },
        tenTheLoai,
      };
    });

    res.json({
      content: {
        data: newData,
      },
    });
  } catch (err) {
    res.json("Lỗi");
  }
};

// ----------------------------------LẤY THÔNG TIN PHIM ---------------------------------------
export const layThongTinPhim = async (req, res, next) => {
  try {
    const  maPhim  = parseInt(req.query.maPhim);
    
    const data = await flimModel
      .findOne({ maPhim }, { _id: 0 })
      .populate({
        path: "thongTinPhim",
        model: flimInforModel,
        select: "-_id",
      })
      .populate({
        path: "thongTinPhim",
        populate: {
          path: "theLoai",
          model: flimGenreModel,
          select: "-_id",
        },
      })
      .lean(); // trả về kiểu js thuần để có thể map dữ liệu

    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy thông tin phim",
      });
    }

    const { thongTinPhim, ...rest } = data; // bóc tách mảng `theLoai` và các thuộc tính khác của đối tượng `data`
    const { theLoai, _id, ...rest2 } = thongTinPhim; // tiếp tục bóc tách mảng thongTinPhim để lấy ra theLoai
    const tenTheLoai = theLoai.map(({ ten }) => ten);

    const newData = {
      ...rest,
      thongTinPhim: {
        ...rest2,
      },
      tenTheLoai,
    };

    res.json({
      content: {
        data: newData,
      },
    });
  } catch (err) {
    res.json("Lỗi");
  }
};



// ---------------------------------XÓA PHIM ---------------------------------------------------
export const xoaPhim = (req, res, next) => {
  const maPhim = parseInt(req.query.maPhim);
  console.log(maPhim)
  flimModel.findOne({ maPhim }, (err, flim) => {
    if (err) {
      console.log(err)
      res.json("Lỗi");
    } else {
      if (!flim) {
        res.json("Không tìm thấy mã phim cần xóa trong cơ sở dữ liệu.");
      } else {
        flimModel.deleteOne({ maPhim }, (err) => {
          if (err) {
            res.json("Lỗi");
          } else {
            res.status(200).json("Xóa phim thành công");
          }
        });
      }
    }
  });
};


// -------------------------------- THÊM PHIM ----------------------------------
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
