// Using Node.js `require()`
import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

// Khung suờn của data, để ràng buộc dữ liệu
const filmSchema = new Schema(
  {
    // _id sẽ tự động có
    tenPhim: String,
    biDanh: String,
    trailer: String,
    hinhAnh: String,
    moTa: String,
    ngayKhoiChieu: Date,
    danhGia: Number,
    hot: Boolean,
    dangChieu: Boolean,
    sapChieu: Boolean,
    thongTinPhim: {
      type: String,
      ref: "filmInfor"
    },
  },
  {
    collection: "Phim",
  }
);

// tên + schema

const filmModel = model("film", filmSchema);

export default filmModel;
