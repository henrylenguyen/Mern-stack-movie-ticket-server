const express = require("express");
const router = express.Router();
const multer = require("multer");
const bodyParser = require("body-parser");
const app = express();
const flimController = require("../controllers/flimController");

router.get("/", flimController.getAllFlims);

router.get("/:id", flimController.getFlimById);

router.post("/", flimController.createFlim);

router.put("/:id", flimController.updateFlimById);

router.delete("/:id", flimController.deleteFlimById);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
router.post("/cart/:id", cartController.addToCart);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./image_flim");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), flimController.createFlim);

module.exports = router;
