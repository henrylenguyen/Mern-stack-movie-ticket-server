import express from "express";
import connectToDatabase from "./models/root.modal.js";
import dotenv from "dotenv";
import accountRouter from "./routes/user.routes.js";
import swaggerSetup from "./swagger/swagger.js"; // import swaggerSetup từ file swagger.js
import morgan from "morgan";
import corsMiddleware from './utils/cors.js';
import { fileURLToPath } from 'url';
dotenv.config();
const app = express();
const port = process.env.PORT;
import bodyParser from "body-parser";
import path from "path";
import router from './routes/routes.js';
const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// app.use(corsMiddleware);
// CORS middleware
app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});

//----------------------------------SERVER----------------------------------------------------------
async function startServer() {
  app.use(morgan("dev"));

  // Kết nối đến database trước khi khởi động ứng dụng
  await connectToDatabase();
  
  // ------------------------SỬ DỤNG ROUTES--------------------------------------
 
  // app.get('/', (req, res) => {
  //   res.sendFile(path.join(__dirname, 'token.html'));
  // });
  app.use("/api/QuanLyNguoiDung", accountRouter);
  app.use("/api",router)
  // Set up Swagger middleware
  swaggerSetup(app);

  // Khởi động ứng dụng
  app.listen(port, () => {
    console.log(
      `Server đang chạy ở cổng http://localhost:${port}, click vào để xem`
    );
  });
}

startServer();
