
// Using Node.js `require()`
import {  Schema as _Schema, model } from 'mongoose';


const Schema = _Schema;


 // Khung suờn của data, để ràng buộc dữ liệu
 const roleSchema = new Schema({
  // _id sẽ tự động có
  ten: String,
},{
  collection: "phanQuyen"
});

// tên + schema
const roleModel = model("phanQuyen",roleSchema);

export default roleModel;