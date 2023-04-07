// Using Node.js `require()`
import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

// Khung suờn của data, để ràng buộc dữ liệu
const bannerSchema = new Schema(
  {
    // _id sẽ tự động có
    maPhim: String,
    hinhAnh: String,
  },
  {
    collection: "Banner",
  }
);

// tên + schema
const bannerModel = model("banner", bannerSchema);

export default bannerModel;
