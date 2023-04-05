import express from 'express';
import connectToDatabase from './models/root.modal.js';
import dotenv from 'dotenv';
import accountRouter from './routes/user.routes.js';
import swaggerSetup from './swagger/swagger.js'; // import swaggerSetup từ file swagger.js

dotenv.config();
const app = express();
const port =  process.env.PORT
import bodyParser from "body-parser";
import path from "path";
import jwt from "jsonwebtoken";
import fs from "fs"

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// CORS middleware
app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});

//----------------------------------SERVER----------------------------------------------------------
async function startServer() {
  // Kết nối đến database trước khi khởi động ứng dụng
  await connectToDatabase();


  // ------------------------SỬ DỤNG ROUTES--------------------------------------

  app.use("/api/QuanLyNguoiDung", accountRouter);

  // Set up Swagger middleware
  swaggerSetup(app);

  // sign with RSA SHA256
  // var privateKey = fs.readFileSync('./key/private.pem');
  // jwt.sign({ name: 'Lê Nguyễn Phương Thái' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
  //   console.log(token);
  // });
  // Khởi động ứng dụng
  app.listen(port, () => {
    console.log(`Server đang chạy ở cổng http://localhost:${port}, click vào để xem`);
  });
}

startServer();
