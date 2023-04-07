// Using Node.js `require()`
import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

// Khung suờn của data, để ràng buộc dữ liệu
const flimGenreSchema = new Schema(
  {
    ten:String
  },
  {
    collection: "theLoaiPhim",
  }
);

// tên + schema
const flimGenreModel = model("filmGenre", flimGenreSchema);


export default flimGenreModel;
