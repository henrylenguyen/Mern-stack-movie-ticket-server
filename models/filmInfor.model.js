// Using Node.js `require()`
import { Schema as _Schema, model } from "mongoose";
import flimGenreModel from "./genres.model.js";

const Schema = _Schema;

// Khung suờn của data, để ràng buộc dữ liệu
const flimInforSchema = new Schema(
  {
    // _id sẽ tự động có
    daoDien: String,
    dienVien: Array,
    doTuoi: Number,
    theLoai: {
      type: Array,
      ref: "filmGenre"
    },
  },
  {
    collection: "thongTinPhim",
  }
);

// tên + schema
const flimInforModel = model("flimInfor", flimInforSchema);


export default flimInforModel;
