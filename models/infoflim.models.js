// Using Node.js `require()`
import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

// Khung suờn của data, để ràng buộc dữ liệu
const infoflimSchema = new Schema(
  {
    // _id sẽ tự động có
    daoDien: String,
    dienVien: Array,
    doTuoi: Int32,
    theLoai: Array,
  },
  {
    collection: "thongTinPhim",
  }
);

// tên + schema

const infoflimModel = model("infoflim", infoflimSchema);

export default infoflimModel;
