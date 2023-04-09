import filmInforModel from "../models/filmInfor.model.js";
import filmModel from "../models/film.model.js";
import filmGenreModel from "../models/genres.model.js";
import axios from "axios";

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
      const total = await filmModel.countDocuments({});
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
      const data = await filmModel
        .find({}, { _id: 0 })
        .populate({
          path: "thongTinPhim",
          model: filmInforModel,
          select: "-_id",
        })
        .populate({
          path: "thongTinPhim",
          populate: {
            path: "theLoai",
            model: filmGenreModel,
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
    const data = await filmModel
      .find({}, { _id: 0 })
      .populate({
        path: "thongTinPhim",
        model: filmInforModel,
        select: "-_id",
      })
      .populate({
        path: "thongTinPhim",
        populate: {
          path: "theLoai",
          model: filmGenreModel,
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
      content: newData,
    });
  } catch (err) {
    res.json("Lỗi");
  }
};

// -------------------------------LẤY DANH SÁCH PHIM SẮP CHIẾU---------------
export const layDanhSachPhimSapChieu = async (req, res, next) => {
  try {
    const data = await filmModel
      .find(
        { ngayKhoiChieu: { $gte: new Date() } }, // lọc phim có ngày khởi chiếu sau ngày hiện tại
        { _id: 0 }
      )
      .populate({
        path: "thongTinPhim",
        model: filmInforModel,
        select: "-_id",
      })
      .populate({
        path: "thongTinPhim",
        populate: {
          path: "theLoai",
          model: filmGenreModel,
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
      content: newData,
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
      const total = await filmModel.countDocuments({
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
      const data = await filmModel
        .find({ ngayKhoiChieu: { $gte: new Date() } }, { _id: 0 })
        .populate({
          path: "thongTinPhim",
          model: filmInforModel,
          select: "-_id",
        })
        .populate({
          path: "thongTinPhim",
          populate: {
            path: "theLoai",
            model: filmGenreModel,
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
    const data = await filmModel
      .find(
        { hot: true }, // lọc phim đang hot
        { _id: 0 }
      )
      .sort({ danhGia: -1 }) // sắp xếp theo danhGia giảm dần
      .limit(10) // lấy 10 bộ phim đầu tiên
      .populate({
        path: "thongTinPhim",
        model: filmInforModel,
        select: "-_id",
      })
      .populate({
        path: "thongTinPhim",
        populate: {
          path: "theLoai",
          model: filmGenreModel,
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
      content: newData,
    });
  } catch (err) {
    res.json("Lỗi");
  }
};
// ---------------------------------LẤY PHIM ĐANG CHIẾU--------------------------------------

export const layDanhSachPhimDangChieu = async (req, res, next) => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // calculate the date one month ago

    const data = await filmModel
      .find(
        {
          dangChieu: true, // get only the movies currently showing
          ngayKhoiChieu: { $lte: new Date(), $gte: oneMonthAgo }, // release date within the past month
        },
        { _id: 0 }
      )
      .populate({
        path: "thongTinPhim",
        model: filmInforModel,
        select: "-_id",
      })
      .populate({
        path: "thongTinPhim",
        populate: {
          path: "theLoai",
          model: filmGenreModel,
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
      content: newData,
    });
  } catch (err) {
    res.json("Lỗi");
  }
};


// --------------------------------LẤY PHIM ĐANG CHIẾU PHÂN TRANG--------------------------------
export const layDanhSachPhimDangChieuPhanTrang = async (req, res, next) => {
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
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // calculate the date one month ago

      const total = await filmModel.countDocuments({
        dangChieu: true,
        ngayKhoiChieu: { $lte: new Date(), $gte: oneMonthAgo },
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
      const data = await filmModel
        .find(
          {
            dangChieu: true,
            ngayKhoiChieu: { $lte: new Date(), $gte: oneMonthAgo },
          },
          { _id: 0 }
        )
        .populate({
          path: "thongTinPhim",
          model: filmInforModel,
          select: "-_id",
        })
        .populate({
          path: "thongTinPhim",
          populate: {
            path: "theLoai",
            model: filmGenreModel,
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


// ----------------------------------LẤY THÔNG TIN PHIM ---------------------------------------
export const layThongTinPhim = async (req, res, next) => {
  try {
    const maPhim = parseInt(req.query.maPhim);

    const data = await filmModel
      .findOne({ maPhim }, { _id: 0 })
      .populate({
        path: "thongTinPhim",
        model: filmInforModel,
        select: "-_id",
      })
      .populate({
        path: "thongTinPhim",
        populate: {
          path: "theLoai",
          model: filmGenreModel,
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
      content: newData,
    });
  } catch (err) {
    res.json("Lỗi");
  }
};

// ---------------------------------XÓA PHIM ---------------------------------------------------
export const xoaPhim = (req, res, next) => {
  const maPhim = parseInt(req.query.maPhim);
  console.log(maPhim);
  filmModel.findOne({ maPhim }, (err, film) => {
    if (err) {
      console.log(err);
      res.json("Lỗi");
    } else {
      if (!film) {
        res.json("Không tìm thấy mã phim cần xóa trong cơ sở dữ liệu.");
      } else {
        filmModel.deleteOne({ maPhim }, (err) => {
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

// ---------------------------------LẤY PHIM TỰ ĐỘNG -------------------------------------

export const layPhimTuDong = async () => {
  let response = await axios.get(
    "https://api.themoviedb.org/3/movie/upcoming",
    {
      params: {
        api_key: process.env.API_KEY,
      },
    }
  );
  console.log("file: film.controller.js:406 ~ response:", response);
  let check = [];
  response?.data?.results.map((item) => check.push(item.original_title));

  try {
    const existingFilms = await filmModel.find({ tenPhim: { $in: check } });
    const existingFilmNames = existingFilms.map((film) => film.tenPhim);
    const newFilms = response?.data?.results.filter(
      (item) => !existingFilmNames.includes(item.original_title)
    );
    const slugify = (text) =>
      text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
        .replace(/[^\w\-]+/g, "") // Xóa các ký tự không hợp lệ
        .replace(/\-\-+/g, "-") // Xóa các dấu gạch ngang liên tiếp
        .replace(/^-+/, "") // Xóa các dấu gạch ngang ở đầu chuỗi
        .replace(/-+$/, ""); // Xóa các dấu gạch ngang ở cuối chuỗi

    newFilms.map((item) => {
      const tenPhim = item.original_title;
      const biDanh = slugify(tenPhim);
      const ngayKhoiChieu = new Date(item.release_date);
      const dangChieu = ngayKhoiChieu <= new Date();
      const sapChieu = !dangChieu;
      filmModel.create({
        tenPhim,
        moTa: item.overview,
        maPhim: parseInt(item.id),
        ngayKhoiChieu: item.release_date,
        danhGia: item.vote_average,
        trailer: "https://www.youtube.com/embed/wHLpZycZNwE",
        biDanh,
        hot: true,
        dangChieu,
        sapChieu,
        hinhAnh: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
        thongTinPhim: "642bdccd6501a58c8393b06d",
      });
    });

    console.log(`Có ${newFilms.length} phim mới được thêm vào MongoDB`);
  } catch (error) {
    console.error(error);
  }
};
