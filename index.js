import express from "express";
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const app = express();
const port = 1812;

const flimRouter = require("./routes/flimRoutes");
const userRouter = require("./routes/userRoutes");

// Set up session middleware
const mongoStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: "sessions",
});

app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    store: mongoStore,
  })
);

// Set up body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set up static files middleware
app.use(express.static(path.join(__dirname, "public")));

// Set up routeser);
app.use("/flim", flimRouter);
app.use("/user", userRouter);

//Bắt đầu một session
app.use((req, res, next) => {
  req.session = req.session || {};
  next();
});
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// get "/" là lấy route mặc định trang chủ
app.get("/", (req, res) => {
  res.send("<h1>Website Xem Phim</h1>");
});

app.listen(port, () => {
  console.log(
    `Ứng dụng đang chạy ở cổng http://localhost:${port}, click vào để xem`
  );
});
