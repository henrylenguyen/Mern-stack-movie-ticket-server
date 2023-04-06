
// Using Node.js `require()`
import {  Schema as _Schema, model } from 'mongoose';


const Schema = _Schema;


 // Khung suờn của data, để ràng buộc dữ liệu
 const userSchema = new Schema({
  // _id sẽ tự động có
  taiKhoan: String,
  matKhau: String,
  hoTen: String,
  email: String,
  soDT: String,
  maLoaiNguoiDung: {
    type: String,
    ref: "phanQuyen" // đối chiếu đến tên của model
  },
  diem: Number,
  avatar:String
},{
  collection: "QuanLyNguoiDung"
});

// tên + schema
const userModel = model("user",userSchema);

export default userModel;