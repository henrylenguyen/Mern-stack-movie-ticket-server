// Using Node.js `require()`
import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

// Khung suờn của data, để ràng buộc dữ liệu
const filmGenreSchema = new Schema(
  {
    ten:String
  },
  {
    collection: "theLoaiPhim",
  }
);

// tên + schema
const filmGenreModel = model("filmGenre", filmGenreSchema);


export default filmGenreModel;
