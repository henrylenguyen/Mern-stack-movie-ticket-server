const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flimSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

const Flim = mongoose.model("Flim", flimSchema);

module.exports = Flim;
