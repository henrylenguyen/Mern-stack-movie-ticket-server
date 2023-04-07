// Using Node.js `require()`
import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

// Khung suờn của data, để ràng buộc dữ liệu
const infocinemaSchema = new Schema(
  {
    // _id sẽ tự động có
    maCumRap: String,
    tenCumRap: String,
    diaChi: String,
    danhSachRap: String,
  },
  {
    collection: "ThongTinRapChieuPhim",
  }
);

// tên + schema

const infocinemaModel = model("infocinema", infocinemaSchema);

export default infocinemaModel;
