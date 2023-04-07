// Using Node.js `require()`
import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

// Khung suờn của data, để ràng buộc dữ liệu
const categorySchema = new Schema(
  {
    // _id sẽ tự động có
    ten: String,
  },
  {
    collection: "theLoaiPhim",
  }
);

// tên + schema
const categoryModel = model("category", categorySchema);

export default categoryModel;
