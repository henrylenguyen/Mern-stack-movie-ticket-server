import express from "express";
const app = express();
const port = 1812;

// get "/" là lấy route mặc định trang chủ
app.get("/", (req, res) => {
  res.send("<h1>Website Xem Phim</h1>");
});

app.listen(port, () => {
  console.log(
    `Ứng dụng đang chạy ở cổng http://localhost:${port}, click vào để xem`
  );
});
