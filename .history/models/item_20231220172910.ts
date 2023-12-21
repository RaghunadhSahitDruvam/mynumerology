import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  chaldean: {
    type: String,
  },
  pythogorous: {
    type: String,
  },
  tot_letters: {
    type: Number,
  },
  g2tot: {
    type: Number,
  },
  g3tot: {
    type: Number,
  },
  g2vtot: {
    type: Number,
  },
  g3vtot: {
    type: Number,
  },
  g2nettot: {
    type: Number,
  },
  g3nettot: {
    type: Number,
  },
});

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);

export default Item;
