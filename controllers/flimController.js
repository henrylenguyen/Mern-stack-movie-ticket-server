const Flim = require("../models/flim");
const Category = require("../models/category");
const mongoose = require("mongoose");

exports.getCreateFlimPage = async (req, res) => {
  const categories = await Category.find(); // lấy danh mục sản phẩm
  const flims = await Flim.find().select("_id name description price image");
  res.render("flim-create", { categories: categories });
};

exports.createFlim = async (req, res, next) => {
  const { name, description, price, image, category } = req.body;
  const flim = new Flim({
    name: name,
    description: description,
    price: price,
    image: image,
    category: category,
  });
  const categories = await Category.find(); // lấy danh mục sản phẩm
  const flims = await Flim.find().select("_id name description price image");
  flim
    .save()
    .then((result) => {
      console.log("Created Flim");
      res.render("flim-create", { categories: categories });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.getAllFlims = async (req, res) => {
  try {
    const categories = await Category.find(); // lấy danh mục sản phẩm
    const flims = await Flim.find().select("_id name description price image"); // lấy danh sách sản phẩm
    res.render("shop", { categories: categories, flims: flims }); // truyền dữ liệu vào view
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
exports.getAllFlimsAdmin = async (req, res) => {
  try {
    const categories = await Category.find(); // lấy danh mục sản phẩm
    const flims = await Flim.find().select("_id name description price image"); // lấy danh sách sản phẩm
    res.render("flim-list", { categories: categories, flims: flims }); // truyền dữ liệu vào view
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const { ObjectId } = require("mongodb");
exports.getFlimById = (req, res, next) => {
  const id = new ObjectId(req.params.id);
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid flim ID" });
  }
  Flim.findById(id)
    .select("_id name description price image category")
    .then((flim) => {
      if (!flim) {
        return res.status(404).json({ message: "Flim not found" });
      }
      res.render("flim", { flim: flim });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.updatePage = async (req, res) => {
  try {
    const categories = await Category.find(); // lấy danh mục sản phẩm
    const id = req.params.id;
    const flim = await Flim.findById(id).select(
      "_id name description price image"
    );
    res.render("flim-edit", { categories: categories, flim: flim }); // truyền dữ liệu vào view
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
exports.updateFlimById = (req, res, next) => {
  const id = req.params.id;
  const { name, description, price, image, category } = req.body;
  Flim.findByIdAndUpdate(
    id,
    { name, description, price, image, category },
    { new: true }
  )
    .then((flim) => {
      if (!flim) {
        return res.status(404).json({ message: "Flim not found" });
      }
      res.redirect("/admin/list-flim");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.deleteFlimById = async (req, res, next) => {
  const id = req.params.id;
  const flims = await Flim.find().select("_id name description price image");
  Flim.findByIdAndRemove(id)
    .then((flim) => {
      if (!flim) {
        return res.status(404).json({ message: "Flim not found" });
      }
      res.redirect("/admin/list-flim");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.indexFlim = async (req, res) => {
  try {
    const newFlims = await Flim.find().sort({ _id: -1 }).limit(4);
    const firstFlims = await Flim.find().sort({ _id: 1 }).limit(4);

    res.render("index", { newFlims, firstFlims });
  } catch (err) {
    console.error(err);
  }
};
