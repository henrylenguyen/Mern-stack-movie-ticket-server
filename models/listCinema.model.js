// Using Node.js `require()`
import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

// Khung suờn của data, để ràng buộc dữ liệu
const listCinemaSchema = new Schema(
  {
    // _id sẽ tự động có
    danhSachRap: String,
  },
  {
    collection: "DanhSachPhong",
  }
);

// tên + schema

const listCinemaModel = model("listCinema", listCinemaSchema);

export default listCinemaModel;
