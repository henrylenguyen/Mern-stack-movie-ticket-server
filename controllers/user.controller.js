import roleModel from "../models/role.model.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

// -------------------------------LẤY NGƯỜI DÙNG PHÂN TRANG-------------------------------------------
export const layDanhSachNguoiDungPhanTrang = async (req, res, next) => {
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
      const total = await userModel.countDocuments({});
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
      const data = await userModel
        .find({})
        .populate({
          path: "maLoaiNguoiDung",
          model: roleModel,
          select: "-_id ten",
        })
        .lean() // chuyển đổi dữ liệu thành đối tượng JavaScript thuần túy
        .skip(soLuongBoQua)
        .limit(PAGE_SIZE);
      data.forEach((user) => {
        user.maLoaiNguoiDung = user.maLoaiNguoiDung.ten;
      });
      let tongSoTrang = Math.ceil(total / PAGE_SIZE);
      if (page > tongSoTrang) {
        return res.json({
          message: "Lấy dữ liệu thành công",
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
        message: "Lấy dữ liệu thành công",
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


// -------------------------------LẤY TOÀN BỘ NGƯỜI DÙNG-------------------------------------------

export const layDanhSachNguoiDung = (req, res, next) => {
  userModel
    // muốn populate trường nào thì truyền tên trường đó vào + với tên model tham chiếu
    // nếu muốn loại bỏ cột nào không cần populate thì chỉ cần -cột là được
    .find({})
    .populate({
      path: "maLoaiNguoiDung",
      model: roleModel,
      select: "-_id ten",
    })
    .lean() // chuyển đổi dữ liệu thành đối tượng JavaScript thuần túy
    .then((data) => {
      data = data.map((user) => {
        user.maLoaiNguoiDung = user.maLoaiNguoiDung.ten;
        return user;
      });
      res.json({
        message: "Lấy dữ liệu thành công",
        content: {
          data
        }
      });
    })
    .catch((err) => {
      res.json("Lỗi");
    });
};

// -------------------------------THÊM NGƯỜI DÙNG-------------------------------------------
export const themNguoiDung = (req, res, next) => {
  const { taiKhoan, email, soDT, matKhau, hoTen, diem } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(matKhau, salt);
  userModel
    .findOne({
      $or: [{ taiKhoan: taiKhoan }, { email: email }, { soDT: soDT }],
    })
    .then((user) => {
      if (user) {
        // username hoặc email đã tồn tại, trả về thông báo tương ứng
        if (user.taiKhoan === taiKhoan) {
          res.status(400).json({ message: "Username đã tồn tại" });
        } else if (user.email === email) {
          res.status(400).json({ message: "Email đã tồn tại" });
        } else {
          res.status(400).json({ message: "Số điện thoại đã tồn tại" });
        }
      } else {
        // tạo mới người dùng
        return userModel.create({
          taiKhoan,
          matKhau: hashedPassword,
          hoTen,
          email,
          soDT,
          diem: 0,
          maLoaiNguoiDung: "642c4edb81233e85462fe9b4",
          avatar: "",
        });
      }
    })
    .then((user) => {
      res.json({ message: "Thêm mới thành công" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Lỗi" });
    });
};
// -------------------------------CẬP NHẬT NGƯỜI DÙNG-------------------------------------------

export const capNhatThongTinNguoiDung = async (req, res, next) => {
  const { taiKhoan, email, soDT, matKhau, hoTen, maLoaiNguoiDung } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(matKhau, salt);
  try {
    const foundUser = await userModel.findOne({ taiKhoan });
    console.log(foundUser);
    if (!foundUser) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }
    if (maLoaiNguoiDung === "NhanVien") {
      foundUser.maLoaiNguoiDung = "642c4eea81233e85462fe9b5";
    } else if (maLoaiNguoiDung === "QuanTri") {
      foundUser.maLoaiNguoiDung = "642c4ebc81233e85462fe9b3";
    } else if (maLoaiNguoiDung === "QuanLy") {
      foundUser.maLoaiNguoiDung = "642c4f3b81233e85462fe9b7";
    } else {
      foundUser.maLoaiNguoiDung = "642c4edb81233e85462fe9b4";
    }
    foundUser.matKhau = hashedPassword;
    foundUser.email = email;
    foundUser.soDT = soDT;
    foundUser.hoTen = hoTen;
    await foundUser.save();

    res.json({ message: "Cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi" });
  }
};

// -------------------------------CẬP NHẬT THÔNG TIN TÀI KHOẢN-----------------------------------
