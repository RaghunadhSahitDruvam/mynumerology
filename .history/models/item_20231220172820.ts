import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
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
    type: String,
    required: true,
  },
  g2vtot: {
    type: Number,
    required: true,
  },
  g3vtot: {
    type: String,
    default: "Seller",
  },
  g2nettot: {
    type: Number,
    required: true,
  },
  g3nettot: {
    type: Object,
  },
});

const Shop = mongoose.models.Item || mongoose.model("Item", shopSchema);

export default Shop;
