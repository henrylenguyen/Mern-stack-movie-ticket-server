const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { secret } = require("../config/config.json");
const User = require("../models/user");

// Controller for handling user creation
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const user = new User({
      name,
      email,
      password,
      isAdmin,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully!", user });
  } catch (err) {
    next(err);
  }
};

// Controller for getting all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.render("user-list", { users: users });
  } catch (err) {
    next(err);
  }
};

// Controller for getting a user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
exports.updatePage = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.render("user-edit", { user: user }); // truyền dữ liệu vào view
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
// Controller for updating a user by ID
exports.updateUserById = async (req, res, next) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, {
      name,
      email,
      password,
      isAdmin,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.redirect("/admin/list-user");
  } catch (err) {
    next(err);
  }
};

// Controller for deleting a user by ID
exports.deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.redirect("/admin/list-user");
  } catch (err) {
    next(err);
  }
};

//form register
exports.registerPage = async (req, res) => {
  res.render("register");
};
// Controller for handling user registration
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra email đã tồn tại trong database hay chưa
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "Email already exists." });
    }

    // Mã hóa mật khẩu bằng bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.render("login");
  } catch (err) {
    next(err);
  }
};

exports.loginPage = async (req, res) => {
  res.render("login");
};

exports.checkLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra email và password
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Kiểm tra mật khẩu
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Tạo JWT token
    const token = jwt.sign({ userId: user._id }, secret);

    // Phân quyền người dùng
    let role = "user"; // Mặc định là user
    if (user.isAdmin) {
      role = "admin"; // Nếu là admin thì gán role là admin
    }

    // Lưu role vào cookie
    res.cookie("role", role, { httpOnly: true });
    // Lưu thông tin người dùng vào session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role,
    };

    // Chuyển hướng người dùng đến trang chủ hoặc trang quản trị tùy vào role
    if (role === "admin") {
      res.redirect("/admin");
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = (req, res) => {
  // Xóa cookie lưu trữ thông tin phân quyền
  res.clearCookie("role");
  // Xóa session user
  delete req.session.user;
  // Xóa toàn bộ session
  // req.session.destroy((err) => {
  //   if (err) {
  //     console.error(err);
  //   }
  //});
  // Chuyển hướng người dùng đến trang đăng nhập
  res.redirect("/login");
};

// Controller for getting user profile
exports.admin = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.render("user-admin", { user: user }); // truyền dữ liệu vào view
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
