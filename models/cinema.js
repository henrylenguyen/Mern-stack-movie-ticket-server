// Using Node.js `require()`
import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

// Khung suờn của data, để ràng buộc dữ liệu
const flimSchema = new Schema(
  {
    // _id sẽ tự động có
    maHeThongRap: String,
    tenHeThongRap: String,
    biDanh: String,
    logo: String,
    
  },
  {
    collection: "RapChieuPhim",
  }
);

// tên + schema
const flimModel = model("flim", flimSchema);

export default flimModel;
