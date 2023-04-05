import userModel from "../models/user.model.js";

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
      const data = await userModel.find({}).skip(soLuongBoQua).limit(PAGE_SIZE);
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


// for(let i=1;i<=20;i++){
//  userModel.create({
//             taiKhoan:`TaiKhoan ${i}`,
//             matKhau: "123456",
//             hoTen: `Lê Nguyễn Phương Thái ${i}`,
//             email: `abc${i}@gmail.com`,
//             soDT: `01234567${i}`,
//             maLoaiNguoiDung: "642c4edb81233e85462fe9b4",
//             diem: 1,
//             avatar: ""
//           })
// }
export const layDanhSachNguoiDung = (req, res, next) => {

  userModel
    .find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json("Lỗi");
    });
};

export const themNguoiDung = (req,res,next)=>{
  const taiKhoan = req.body.taiKhoan;
  const email = req.body.email;
  const soDT = req.body.soDT;
  userModel.findOne({ $or: [{ taiKhoan: taiKhoan }, { email: email },{soDT:soDT}] })
  .then((user) => {
    if (user) {
      // username hoặc email đã tồn tại, trả về thông báo tương ứng
      if (user.taiKhoan === taiKhoan) {
        res.status(400).json({ message: "Username đã tồn tại" });
      } else if(user.email === email) {
        res.status(400).json({ message: "Email đã tồn tại" });
      } else{
        res.status(400).json({ message: "Số điện thoại đã tồn tại" });
      }
    } else {
      // tạo mới người dùng
      // return userModel.create({ username, email });
    }
  })
  .then((user) => {
    res.json({ message: "Thêm mới thành công" });
  })
  .catch((error) => {
    res.status(500).json({ message: "Lỗi" });
  });

}
