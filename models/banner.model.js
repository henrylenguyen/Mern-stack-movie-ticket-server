// Using Node.js `require()`
import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

// Khung suờn của data, để ràng buộc dữ liệu
const BannerSchema = new Schema(
  {
    maPhim:String,
    hinhAnh: String,
  },
  {
    collection: "Banner",
  }
);

// tên + schema
const bannerModel = model("Banner", BannerSchema);


export default bannerModel;
